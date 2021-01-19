/* eslint-disable no-unused-vars */
/*
 * @Author: arvin
 * @Date: 2020-09-16 13:35:48
 * @Last Modified by: Arvin
 * @Last Modified time: 2020-12-29 16:22:18
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

/** 弹窗的统一回调 */
type DialogCB = (cb: {
    /** 弹窗的节点ID */
    id: string;

    /** 生成的node对象 */
    node: HTMLElement;

    /** 移除当前节点 */
    remove: fn;

    /** 关闭方式，有的时候可能要监听是弹窗右上角关闭，还是点了取消按钮 */
    closeMode?: 'icon' | 'btn';
}) => void;

/** 拓展的事件接口 */
interface TriggerEvent extends Event {
    /** 事件参数 */
    data: Params
}

interface ExtraEventTarget extends EventTarget {
    /** 标签名 */
    tagName: string

    /** 父节点 */
    parentNode: HTMLElement
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

/**
 * 弹窗接口
 *
 * @author arvin
 * @interface DialogArgs
 */
interface DialogArgs {
    /** 弹窗标题 */
    title?: string;

    /** 弹窗内容 */
    content: string | HTMLElement;

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

/**
 * toast 接口
 *
 * @author arvin
 * @interface ToastArgs
 */
interface ToastArgs {
    /** 显示的文本 */
    message?: string;

    /** 图标类型 成功 失败 加载中 */
    type?: 'success' | 'fail' | 'loading';

    /** 是否自动关闭，默认自动关闭 */
    autoClose?: boolean;

    /** 节点生成之后的回调函数 */
    complete?: DialogCB;
}

interface AuthData {
    uid: number
    token: string
}

/** iosapp分享选项 */
interface AppShareItem {
    wxsession: boolean
    wxtimeline: boolean
    qq: boolean
    qzone: boolean
}

type HandlerKey = 'getUserAccount' | 'setUserAccount' | 'setTitle'
    | 'clearCache' | 'wxAuth' | 'setRefresh'
    | 'setBack' | 'setGoTo' | 'setShare' | 'setGoToURL'

interface WebViewBridge {
    callHandler: (
        key: HandlerKey,
        value?: string | AuthData | AppShareItem | ((data: AuthData) => void) | boolean
    ) => void
    registerHandler: (key: 'shareComplete', value: (data: string) => void) => void
}

interface Window {
    android: {
        /** 清除缓存 */
        clearCache: () => void
        /** 微信授权 */
        wxAuth: (key: string) => void
        /** 设置标题 */
        setTitle: (title: string) => void
        setUserAccount: (data: string) => void
        getUserAccount: () => string
        setRefresh: (type: boolean) => void
        setBack: (type: boolean) => void
        setGoTo: (type: boolean) => void
        setShare: (data: string) => void
        setGoToURL: (href: string) => void
    }
    YGITEMS: {
        /** 用户服务协议 */
        getAgreement: () => string
        /** 隐私保护 儿童信息保护 */
        getSecrecyAndBabyRules: () => string
        /** 游戏许可服务协议 支付面板 */
        getPayRule: () => string
    }
    wx: {
        config: (args: {
            /** 开启调试模式 */
            debug: boolean
            /** 必填，公众号的唯一标识 */
            appId: string
            /** 必填，生成签名的时间戳 */
            timestamp: string
            /** 必填，生成签名的随机串 */
            nonceStr: string
            /** 必填，签名 */
            signature: string
            /** 必填，需要使用的JS接口列表 */
            jsApiList: string[]
        }) => void
        /**  config信息验证后会执行ready方法 */
        ready: (cb: () => void) => void
        /** 分享给朋友，数据初始化 */
        onMenuShareAppMessage: (args: {
            title: string
            desc: string
            link: string
            imgUrl: string
        }) => void
        /** 隐藏的菜单列表 */
        hideMenuItems: (args: {
            menuList: string[]
        }) => void
    }
}

declare namespace AWY_UTILS {

    /**
     * 异步请求
     *
     * @author arvin
     * @param {string} url 接口链接
     * @param {params} [data] 额外参数
     * @param {method} [method] 请求方式，默认get
     * @param {responseType} [responseType] 返回类型
     * @returns {Promise<unknown>}
     */
    function ajax(
        url: string,
        data?: Params,
        method?: Method,
        responseType?: AjaxRes
    ): Promise<unknown>;

    /**
     * URL参数拼接拼接
     *
     * @author arvin
     * @export
     * @param {string} url 原始URL
     * @param {params} params 需要拼接的参数
     * @returns {string} 拼接完成后的URL
     */
    function buildURL(url: string, params: Params): string;

    /**
     * 给链接附加额外参数 chid subchid trial statid
     *
     * @author arvin
     * @export
     * @param {string} u
     * @returns {string}
     */
    function buildExtraParams(u: string): string

    /**
     * 设置链接上的参数
     *
     * @author arvin
     * @export
     * @param {string} url 要设置参数的URL
     * @param {params} params 设置的参数对象
     * @returns {string} 设置完成的URL
     */
    function setURLVar(url: string, params: Params): string;

    /**
    * 复制文本
    *
    * @author arvin
    * @export
    * @param {string} str 将要复制的文本内容
    * @returns {Promise<void>} promise对象 通过 .then() .catch() 捕捉复制状态
    */
    function copy(str: string): Promise<void>;

    /**
     * 文件加载
     *
     * @author arvin
     * @export
     * @returns {Promise<void>}
     */
    function loadSingleFile(args: {
        /** 文件路径 */
        src: string;

        /** 给当前文件分配一个ID */
        id?: string;

        /** 文件类型 默认script */
        type?: 'script' | 'link';

        /** 版本号，默认会生成一个时间戳版本 */
        ver?: string;
    }): Promise<void>;

    /**
     * 创建一个居中的提示窗
     *
     * @author arvin
     * @export
     * @param {(string | DialogArgs)} args
     */
    function dialog(args: string | DialogArgs): void;

    /**
     * 创建一个loading
     *
     * @author arvin
     * @export
     * @param {string} [message] loading显示的文本，默认显示加载中
     */
    function showLoading(message?: string): void;

    /**
     * 移除loading
     *
     * @author arvin
     * @export
     */
    function hideLoading(): void;

    /**
     * 创建一个toast 简易的提示框
     *
     * @author arvin
     * @export
     * @param {(string | ToastArgs)} args
     */
    function toast(args: string | ToastArgs): void;

    /**
     * 获取一个随机字符串
     *
     * @author arvin
     * @export
     * @param {number} [len] 字符串长度，默认8位
     * @param {string} [prevStr] 字符串前缀，非必选
     * @returns {string} 随机字符串
     */
    function getRandStr(len?: number, prevStr?: string): string;

    /**
     * 设置缓存
     *
     * @author arvin
     * @export
     * @param {string} key 缓存的key
     * @param {string | number} value 缓存的值
     */
    function setStorage(key: string, value: string | number): void;

    /**
     * 读取缓存内容
     *
     * @author arvin
     * @export
     * @param {string} key 缓存对应的key
     * @returns {(string | null)} 返回 key对应的值或者 null
     */
    function getStorage(key: string): string | null;

    /**
     * 移除缓存
     *
     * @author arvin
     * @export
     * @param {string} key 需要移除的key
     */
    function removeStorage(key: string): void;

    /**
     * 获取URL上所有参数
     *
     * @author arvin
     * @export
     * @returns {params} url参数对象
     */
    function getURLQuery(): Params;

    /**
     * 获取URL上某个参数的值
     *
     * @author arvin
     * @export
     * @param {string} key
     * @returns {(string | null)} 参数的值或者null
     */
    function getURLVar(key: string): string | null;

    /**
     * 获取一个UUID，
     * 生成后会自动缓存在当前域，直到清除storage
     * @author arvin
     * @export
     * @returns {string} uuid
     */
    function getUUID(): string;

    /**
     * 是否是QQ环境
     *
     * @author arvin
     * @export
     * @returns {boolean} boolean
     */
    function isQQ(): boolean;

    /**
     * 是否是微信环境
     *
     * @author arvin
     * @export
     * @returns {boolean} boolean
     */
    function isWeixin(): boolean;

    /**
     * 是否是PC端微信
     *
     * @author arvin
     * @export
     * @returns {boolean} boolean
     */
    function isPCWeixin(): boolean;

    /**
     * 是否是安卓设备
     *
     * @author arvin
     * @export
     * @returns {boolean} boolean
     */
    function isAndroid(): boolean;

    /**
     * 是否是苹果设备
     *
     * @author arvin
     * @export
     * @returns {boolean} boolean
     */
    function isiOS(): boolean;

    /**
     * 是否是爱微游APP
     *
     * @author arvin
     * @export
     * @returns {boolean} boolean
     */
    function isAWYAPP(): boolean;

    /**
     * 是否是移动端
     *
     * @author arvin
     * @export
     * @returns {boolean} boolean
     */
    function isMobile(): boolean;

    /**
     * 是否是Safari浏览器 (移动端)
     *
     * @author arvin
     * @export
     * @returns {boolean} boolean
     */
    function isSafari(): boolean;

    /**
     * 是否是Safari生成的桌面APP (仅限苹果系统)
     *
     * @author arvin
     * @export
     * @returns {boolean} boolean
     */
    function isSafariApp(): boolean;

    /**
     * 根据ID或者class选择元素
     *
     * @author arvin
     * @export
     * @param {string} e
     * @returns {NodeListOf<Element>} 返回一个NodeList
     */
    function select(e: string): NodeListOf<Element>;

    /**
     * 创建一个HTML节点对象
     *
     * @author arvin
     * @export
     * @param {string} tag 标签名
     * @returns {HTMLElement} 返回节点对象
     */
    function create(tag: string): HTMLElement;

    /** 渠道ID CPS使用 */
    const CHID: string;

    /** 渠道子ID */
    const SUBCHID: string;

    /** 平台统计ID，功能同CHID，只是用来区分CPS和平台 */
    const STATID: string;

    /** 试玩场景, 1代表是试玩场景 */
    const TRIAL_SCENE: '1';

    /** 分享来源 */
    const SHARE_FROM: string;

    /** 用户ID */
    let UID: number;

    /** 用户登录凭证 */
    let TOKEN: string;

    /** 用户归属的公众号 */
    let BELONG: string;

    /** 用户是否关注公众号 */
    let FOCUS: number;

    /** 是否关注爱微游 */
    let FOCUS_AWY: boolean;

    /** 是否关注爱微游plus */
    let FOCUS_AWY_PLUS: boolean;

    /** 用户注册时间 */
    let ADD_TIME: number;

    /** 用户是否是试玩账号 */
    let ACCOUNT_TYPE: YN;

    /** 当前游戏ID */
    let GAMEID: string;

    /** 是否是试玩状态，该参数综合判断 TRIAL_SCENE 和 ACCOUNT_TYPE */
    let TRIAL: boolean;

    /** 登录按钮，手机登录，游光账号登录 */
    let LOGIN_BTN: HTMLElement;

    /** 修改密码按钮 */
    let MODIFY_BTN: HTMLElement;

    /** 密码登录按钮 */
    let PWD_LOGIN_BTN: HTMLElement;

    /** 记住我按钮 */
    let SAVE_BTN: HTMLElement | null;

    /** 账号节点 */
    let ACCOUNT_INPUT: HTMLInputElement;

    /** 密码节点 */
    let PWD_INPUT: HTMLInputElement | null;

    /** 图片验证码节点 */
    let IMG_INPUT: HTMLInputElement | null;

    /** 短信验证码节点 */
    let SMS_INPUT: HTMLInputElement | null;

    /** 图片验证码session */
    let IMG_SESSION: string;

}
