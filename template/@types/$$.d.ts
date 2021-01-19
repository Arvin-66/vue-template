/* eslint-disable no-unused-vars */
/*
 * @Author: arvin
 * @Date: 2020-10-15 20:49:06
 * @Last Modified by: Arvin
 * @Last Modified time: 2020-12-24 15:55:04
 * @Desc $$ 声明文件
 */
interface Selector {
    /**
     * 添加指定样式，支持链式调用
     *
     * @author arvin
     * @param {string} className 样式名称，多个样式使用空格相隔
     * @returns {this}
     * @example $$('body').addClass('a')
     * $$('body').addClass('a b')
     */
    addClass(className: string): this;

    /**
     * 移除指定样式，支持链式调用
     *
     * @author arvin
     * @param {string} className 样式名称，多个样式使用空格相隔
     * @returns {this}
     * @example $$('body').removeClass('a')
     * $$('body').removeClass('a b')
     */
    removeClass(className: string): this;

    /**
     * 判断元素上是否有某个样式
     *
     * @author arvin
     * @param {string} className 样式名称
     * @returns {boolean} 返回结果 true or false
     * @memberof Selector
     */
    hasClass(className: string): boolean;

    /**
     * 获取当前元素的兄弟元素，不包含本身，需要链式调用
     *
     * @author arvin
     * @returns {this}
     * @example 给当前元素增加 active 样式，兄弟元素移除active样式
     * $$(target).addClass('active').siblings().removeClass('active')
     */
    siblings(): this;

    /**
     * 当前节点添加元素，支持链式调用
     *
     * @author arvin
     * @param {(string | HTMLElement)} node 支持元素字符串 或者 DOM对象
     * @returns {this}
     * @example $$('body').append('<div></div>')
     * $$('body').append(document.createElement('div'))
     */
    append(node: string | HTMLElement): this;

    /**
     * 元素移除
     *
     * @author arvin
     * @example $$('.abc').remove()
     */
    remove(): void;

    /**
     * 向元素添加属性，或者获取元素的属性，当是添加属性的时候支持链式调用
     *
     * @author arvin
     * @param {string} name 属性name
     * @param {string} [value] 属性值
     * @returns {(string | null)}
     * @example $$('.abc').attr('href', 'https://xx.xx.xx') 设置属性
     * const src = $$('.abc').attr('src') 获取属性
     */
    attr(name: string, value?: string): string;

    /**
     * 移除元素属性
     *
     * @author arvin
     * @param {string} name
     * @returns {this}
     * @memberof Selector
     * @example $$('.abc').removeAttr('name')
     */
    removeAttr(name: string): this;

    /**
     * 设置元素文本，获取当前元素的文本内容
     *
     * @author arvin
     * @param {string | number} [txt] 文本内容
     * @returns {(string)}
     * @example $$('.abc').text('hello') 设置文本
     * const txt = $$('.abc').text() 获取文本
     */
    text(txt?: string | number): string;

    /**
     * 设置元素的value，或者获取value
     *
     * @author arvin
     * @param {string} [value] 值
     * @returns {(string)}
     * @example $$('.abc').val('hello') 设置
     * const value = $$('.abc').val() 获取
     */
    val(value?: string): string;

    /**
     * 事件触发器
     *
     * @author arvin
     * @param {string} event 触发的事件名
     * @param {object} [data] 事件数据
     * @example $$('.abc').trigger('click') 触发一次点击事件
     */
    trigger(event: string, data?: Params): void;

    /**
     * 事件绑定
     *
     * @author arvin
     * @param {EventType} type 事件类型
     * @param {(target: HTMLElement) => void} listener 事件执行的函数
     * @param {Capture} [useCapture]
     * @returns {Selector}
     */
    on(
        type: EventType,
        listener: (target: HTMLElement) => void,
        useCapture?: Capture
    ): Selector;

    /**
     * 移除事件
     *
     * @author arvin
     * @param {EventType} [type] 移除的事件类型，可不指定
     * @memberof Selector
     */
    off(type?: EventType): Selector;

    /**
     * element列表
     *
     * @type {HTMLElement[]}
     * @memberof Selector
     */
    targetList: HTMLElement[];

    /**
     * 寻找指定的元素
     *
     * @author arvin
     * @param {string} target
     * @returns {HTMLElement[]}
     * @memberof Selector
     */
    find(target: string): HTMLElement[]
}

declare function $$(selector: string | HTMLElement | Element): Selector;
