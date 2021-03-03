/* eslint-disable no-unused-vars */
/*
 * @Author: arvin
 * @Date: 2020-09-16 13:35:48
 * @Last Modified by: Arvin
 * @Last Modified time: 2021-02-09 14:22:20
 * @Desc AWY_UTILS 声明文件
*/

/** yes or no */
declare const enum YN {
    NO,
    YES
}

/** ajax请求类型 */
type Method = 'GET' | 'POST'

/** ajax返回类型 */
type AjaxRes = XMLHttpRequestResponseType

/** 参数类型 */
type Params = { [key: string]: string | number | undefined }

/** 事件捕获的类型 */
type EventType = keyof HTMLElementEventMap

/** 事件捕获/事件冒泡 */
type Capture = boolean | { once?: boolean; passive?: boolean }

/** 没有返回值的function */
type fn = () => void

type TagNameMap = HTMLElementTagNameMap
type TagName = keyof TagNameMap

/** 秒 */
type Seconds = number

/** 毫秒 */
type Millisecond = number

type Html = HTMLElement
type Div = HTMLDivElement
type Input = HTMLInputElement
type Img = HTMLImageElement
type Span = HTMLSpanElement
type Select = HTMLSelectElement
type Button = HTMLButtonElement

/** 弹窗的统一回调 */
type DialogCB = (cb: {
    /** 节点ID */
    id: string
    /** 生成的node对象 */
    node: Html

    /** 移除当前节点 */
    remove: fn

    /** 关闭方式，有的时候可能要监听是弹窗右上角关闭，还是点了取消按钮 */
    closeMode?: string;
}) => void;

interface UrlResult {
    /** 去参数后的URL */
    href: string

    /** 当前URL上的hash值 */
    hash: string

    /** 当前URL所有参数 */
    args: Params
}

/** 拓展的事件接口 */
interface TriggerEvent extends Event {
    /** 事件参数 */
    data: Params
}

interface ExtraEventTarget extends EventTarget {
    /** 标签名 */
    tagName: string

    /** 父节点 */
    parentNode: Html
}

/** 角色信息 */
interface RoleList {
    /** 角色ID */
    roleid: string

    /** 角色昵称 */
    rolename: string

    /** 服务器ID */
    serverid: string

    /** 服务器名称 */
    servername: string
}

/** 弹窗接口 */
interface DialogArgs {
    /** 弹窗标题 */
    title?: string;

    /** 弹窗内容 */
    content: string | Html;

    /** 弹窗的生成位置，默认body，支持任意的class ID节点 */
    target?: string;

    /** 在有确定按钮的情况下，点击确定按钮是否直接关闭弹窗，默认是直接关闭 */
    autoClose?: boolean;

    /** 是否显示弹窗右上角的关闭按钮 */
    showClose?: boolean;

    /** 不显示底部按钮 */
    hideBtns?: boolean;

    /** dialog的自定义类名 */
    customClass?: string;

    /** 取消按钮上的文本，在没有确定按钮的情况下显示关闭，否则显示取消 */
    cancelText?: string;

    /** 确认按钮上的文本，默认显示确定 */
    confirmText?: string;

    /** 确认按钮上的样式 默认primary */
    confirmType?: 'danger' | 'primary'

    /** 弹窗生成后的一个回调方法 */
    complete?: DialogCB;

    /** 点击取消按钮之后的回调方法 */
    cancel?: DialogCB;

    /** 点击确定按钮之后的回调方法 */
    confirm?: DialogCB;

    /** 该回调方法，不管点击取消还是确认，都会调用 */
    trigger?: DialogCB;
}

/** toast参数接口 */
interface ToastArgs {
    /** 显示的文本 */
    message: string;

    /** 图标类型 成功 失败 加载中 */
    type?: 'success' | 'fail' | 'loading';

    /** 是否自动关闭，默认自动关闭 */
    autoClose?: boolean;

    /** 节点生成之后的回调函数 */
    complete?: DialogCB;
}

/** 文件加载 */
interface LoadFile {
    /** 文件路径 */
    src: string;
    /** 分配的文件ID，可避免重复加载 */
    id?: string;
    /** 文件类型，支持js，css文件，默认type为script */
    type?: 'script' | 'link';
    /** 版本号，可手动设置版本号(有利于缓存)，如果没有传入版本号，版本号按小时更新 */
    ver?: string;
}

declare namespace AWY_UTILS {

    /**
     * 异步请求
     *
     * @author arvin
     * @param {string} url 接口链接
     * @param {Params} [data] 参数
     * @param {Method} [method] 请求方式 默认get
     * @param {AjaxRes} [responseType] 返回类型
     * @returns {Promise<unknown>} promise对象
     */
    function ajax(
        url: string,
        data?: Params,
        method?: Method,
        responseType?: AjaxRes
    ): Promise<unknown>

    /**
     * URL参数拼接
     *
     * @author arvin
     * @param {string} url 待拼接的URL
     * @param {Params} params 追加的参数
     * @returns {string} 拼接完成后的URL
     */
    function buildURL(url: string, params: Params): string

    /**
     * 拆解一个URL
     *
     * @author arvin
     * @param {string} [url]
     * @returns {UrlResult}
     */
    function breakURL(url?: string): UrlResult

    /**
     * 给链接追加额外指定的参数 chid subchid trial statid
     *
     * @author arvin
     * @param {string} url 链接
     * @returns {string} 追加完成的URL
     */
    function buildExtraParams(url: string): string

    /**
     * 设置链接上的参数
     *
     * @author arvin
     * @param {string} url 要设置参数的URL
     * @param {Params} params 参数
     * @returns {string} 设置完成的URL
     */
    function setURLVar(url: string, params: Params): string

    /**
     * 复制
     *
     * @author arvin
     * @param {string} str 将要复制的字符串
     * @returns {Promise<void>} 返回promise对象
     */
    function copy(str: string): Promise<void>

    /**
     * 加载一个文件
     *
     * @author arvin
     * @param {LoadFile} args 文件参数
     * @returns {Promise<void>} 返回promise对象
     */
    function loadSingleFile(args: LoadFile): Promise<void>

    /**
     * 创建一个居中的提示窗
     *
     * @author arvin
     * @param {(string | DialogArgs)} args
     */
    function dialog(args: string | DialogArgs): void

    /**
     * 创建一个loading
     *
     * @author arvin
     * @param {string} [message] loading显示的文本，默认显示加载中
     */
    function showLoading(message?: string): void

    /** 移除loading */
    function hideLoading(): void

    /**
     * 创建一个toast 简易的提示框
     *
     * @author arvin
     * @param {(string | ToastArgs)} [args] 支持字符串或者一个ToastArgs类型对象
     */
    function toast(args?: string | ToastArgs): void

    /**
     * 获取一个随机字符串
     *
     * @author arvin
     * @param {number} [len] 字符串长度，默认8位
     * @param {string} [prevStr] 字符串前缀，非必选
     * @returns {string} 生成完成的字符串
     */
    function getRandStr(len?: number, prevStr?: string): string

    /**
     * 设置永久缓存，不主动清楚将一直存在
     *
     * @author arvin
     * @param {string} key 缓存的key
     * @param {string} value 缓存的值
     */
    function setStorage(key: string, value: string): void

    /**
     * 读取缓存
     *
     * @author arvin
     * @param {string} key 缓存的key
     * @returns {(string | null)} key对应的值，如果没有值，则为null
     */
    function getStorage(key: string): string | null

    /**
     * 移除缓存
     *
     * @author arvin
     * @param {string} key 缓存的key
     */
    function removeStorage(key: string): void

    /**
     * 获取URL上所有参数
     *
     * @author arvin
     * @returns {Params} 返回所有参数
     */
    function getURLQuery(): Params

    /**
     * 获取URL上对应key的值
     *
     * @author arvin
     * @param {string} key 参数key
     * @returns {(string | null)} 没有值则返回null
     */
    function getURLVar(key: string): string | null

    /**
     * 获取一个UUID 生成后会自动缓存在当前域，直到清除
     *
     * @author arvin
     * @returns {string}
     */
    function getUUID(): string

    /**
     * 是否是QQ环境
     *
     * @author arvin
     * @returns {boolean}
     */
    function isQQ(): boolean

    /**
     * 是否是微信环境
     *
     * @author arvin
     * @returns {boolean} boolean
     */
    function isWeixin(): boolean

    /**
     * 是否是PC端微信
     *
     * @author arvin
     * @returns {boolean} boolean
     */
    function isPCWeixin(): boolean

    /**
     * 是否是安卓设备
     *
     * @author arvin
     * @returns {boolean} boolean
     */
    function isAndroid(): boolean

    /**
     * 是否是苹果设备
     *
     * @author arvin
     * @returns {boolean} boolean
     */
    function isiOS(): boolean

    /**
     * 是否是爱微游APP
     *
     * @author arvin
     * @returns {boolean} boolean
     */
    function isAWYAPP(): boolean

    /**
     * 是否是爱微游盒子app
     *
     * @author arvin
     * @returns {boolean}
     */
    function isAwyBoxApp(): boolean

    /**
     * 是否是移动端
     *
     * @author arvin
     * @returns {boolean} boolean
     */
    function isMobile(): boolean

    /**
     * 是否是Safari浏览器 (移动端)
     *
     * @author arvin
     * @returns {boolean} boolean
     */
    function isSafari(): boolean

    /**
     * 是否是Safari生成的桌面APP (仅限苹果系统)
     *
     * @author arvin
     * @returns {boolean} boolean
     */
    function isSafariApp(): boolean

    /**
     * 根据ID或者class选择
     *
     * @author arvin
     * @param {string} el
     * @returns {Element[]} 返回符合条件的元素数组
     */
    function select(el: string): Element[]

    /**
     * 根据元素标签选择
     *
     * @author arvin
     * @template T
     * @param {T} el 元素名称
     * @returns {TagNameMap[T][]} 返回符合条件的元素数组
     */
    function select<T extends TagName>(el: T): TagNameMap[T][]

    /**
     * 创建一个元素对象
     *
     * @author arvin
     * @template T
     * @param {T} tagName 标签名字
     * @returns {TagNameMap[T]} 返回创建完成的对象
     */
    function create<T extends TagName>(tagName: T): TagNameMap[T]

    /** 刷新页面 */
    function refresh(): void

    /**
     * 将时间戳格式化成字符串
     *
     * @author arvin
     * @param {(Seconds | Millisecond)} time 时间戳，支持秒或者毫秒
     * @param {string} formatType 格式化字符串的样式 例如 'yyyy-MM-dd'  'yyyy-MM-dd hh:mm:ss'
     * @returns {string} 格式化的字符串
     */
    function formatTime(time: Seconds | Millisecond, formatType: string): string

    /** 创建一个div对象 */
    function getDiv(): Div

    /** 创建一个button对象 */
    function getButton(): Button

    /** 创建一个span对象 */
    function getSpan(): Span

    /** 创建一个i对象 */
    function getI(): Html

    /** 创建一个input对象 */
    function getInput(): Input

    /** 创建一个select对象 */
    function getSelect(): Select

    /** 获取爱微游app当前的版本号 */
    function getAppVersion(): number

    /** 浏览器user agent */
    const ua: string

    /** 渠道ID CPS使用 */
    const CHID: string

    /** 渠道子ID */
    const SUBCHID: string

    /** 平台统计ID，功能同CHID，只是用来区分CPS和平台 */
    const STATID: string

    /** 试玩场景, 1代表是试玩场景 */
    const TRIAL_SCENE: string

    /** 分享来源 */
    const SHARE_FROM: string

    /** 用户ID */
    let UID: number

    /** 用户登录凭证 */
    let TOKEN: string

    /** 用户归属的公众号 */
    let BELONG: string

    /** 用户是否关注公众号 */
    let FOCUS: number

    /** 是否关注爱微游 */
    let FOCUS_AWY: boolean

    /** 是否关注爱微游plus */
    let FOCUS_AWY_PLUS: boolean

    /** 用户注册时间 */
    let ADD_TIME: number

    /** 用户是否是试玩账号 */
    let ACCOUNT_TYPE: YN

    /** 当前游戏ID */
    let GAMEID: string

    /** 是否是试玩状态，该参数综合判断 TRIAL_SCENE 和 ACCOUNT_TYPE */
    let TRIAL: boolean

    /** 用户的区服ID */
    let SERVERID: string

    /** 游戏中心的一些常规API接口，获取游戏列表，游戏详细内容等 */
    const WebApi: string

    /** 获取分享内容接口 */
    const WebShare: string

    /** 鉴权相关，获取code token 个人信息等 */
    const ApiLogin: string

    /** 获取一些配置信息，例如cps配置 */
    const ApiConf: string

    /** 获取初始化微信sdk的数据等 */
    const ApiCommon: string

    /** 积分商城用到的接口 */
    const MarketURL: string

    /** window对象 */
    const win: Window

    /** document对象 */
    const doc: Document
}
