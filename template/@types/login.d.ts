/* eslint-disable no-unused-vars */
/*
 * @Author: arvin
 * @Date: 2020-10-15 20:27:30
 * @Last Modified by: Arvin
 * @Last Modified time: 2021-02-02 14:34:17
 */

/** 短信码请求类型 */
declare const enum SmsCodeType {
    /**
     * 安全方面，比如修改密码
     */
    SAFE = 1,
    /**
     * 主要用于登录
     */
    LOGIN,
    /**
     * 主要用于绑定
     */
    BIND
}

/** 性别 */
declare const enum Sex {
    /** 未知 */
    unknown,
    /** 男 */
    male,
    /** 女 */
    female
}

/** 用户来源 */
declare const enum UserSource {
    /** 自定义 */
    custom,
    /** 微信 */
    wechat,
    /** qq */
    qq,
    /** 新浪 */
    sina
}

/** 鉴权数据 */
interface AuthData {
    /** 用户ID */
    uid: number

    /** 鉴权凭证 */
    token: string
}

/** 账号信息 */
interface Focus {
    /** 用户是否关注爱微游 */
    focus: number
}

/** 鉴权返回 */
interface CheckData extends AuthData, Focus {
    /** 用户归属的公众号 */
    belong: string

    /** 是否是试玩账号 */
    trial: YN

    /** 注册时间 */
    add_time: number
}

/** 登录选项 */
interface LoginOptions {
    /** 是否开启微信登录 */
    wechat: boolean;

    /** 是否开启QQ登录 */
    qq: boolean;

    /** 是否开启新浪登录 */
    sina: boolean;

    /** 游光账号 */
    yg: boolean;

    /** 是否开启手机登录 */
    mobile: boolean;
}

/** 绑定手机的参数 */
interface BindPhoneArgs {
    /** 礼包名称 */
    giftName: string;

    /** 礼包内容 */
    giftBrief: string;
}

/** 实名信息接口 */
interface VerifyInfo {
    /** 是否成年 */
    adult: YN;

    /** 身份证号 */
    idcard: string;

    /** 是否实名 */
    isVerify: YN;

    /** 姓名 */
    realname: string;
}

/** 手机信息 */
interface PhoneInfo {
    /** 手机号码 */
    phone: string
}

/** 用户信息 */
interface UserInfo extends AuthData, Focus {
    /** 用户头像地址 */
    headimgurl: string

    /** 用户当前积分 */
    lv: number

    /** 用户昵称 */
    nickname: string

    /** 用户性别 */
    sex: Sex

    /** 用户来源 */
    type: UserSource

    /** 用户的VIP等级 */
    vip: number
}

/** 渠道配置 */
interface CPSConfigData {
    /** 是否显示app下载 */
    dlapp?: YN

    /** 是否显示关注 */
    focus?: YN

    /** 是否屏蔽游戏中心内容 */
    isDel?: YN

    config: CPSConfigData

    /** 页面标题 */
    title?: string

    /** 定制的loading过场界面图片地址 */
    logo?: string

    /** 关注界面的二维码地址 */
    replaceQrcodeUrl?: string

    /** 游戏中心是否试玩，1代表试玩 */
    isTrial?: '1'

    /** 不显示游戏中心底部导航 */
    hideFootNav?: '1'

    /** 登录选项，1代表禁用，0代表启用，目前总长度5位，分别代表微信扫码，qq，新浪, 游光账号，手机账号 1,1,1,1,1 */
    loginHideOption?: string

    /** 游戏内是否显示小浮标 */
    ret?: YN
}

interface WebViewBridge {
    callHandler: (
        key: 'getUserAccount' | 'setUserAccount' | 'setTitle' | 'clearCache' | 'wxAuth',
        value?: string | AuthData | ((data: AuthData) => void)
    ) => void
    registerHandler: (key: 'shareComplete', value: (data: string) => void) => void
}

/** 图片验证码  */
interface ImgVerificationCode {
    // 验证码对应的session，随着图片改变
    verify_session: string

    // 图片验证码64位数据地址
    image: string
}

/** token置换的code */
interface Code {
    code: string
}

/** token置换的userToken */
interface UserToken {
    userToken: string
}

/** 国家地区码 */
interface NationCodeNode {
    str: HTMLSelectElement
}

/** 接口的错误信息 */
interface ResError {
    error: number
    flag?: number
}

declare namespace AWY_LOGIN {
    /**
     * 登录初始化
     *
     * @author arvin
     * @returns {Promise<void>}
     */
    function init(): Promise<void>

    /**
     * 调用登录界面
     *
     * @author arvin
     * @param {LoginOptions} [options] 登录选项
     */
    function loadLoginPanel(options?: LoginOptions): void

    /**
     * 根据当前token，获取code
     *
     * @author arvin
     * @returns {Promise<{ code: string }[]>}
     */
    function getCodeByToken(): Promise<Code[]>

    /**
     * 根据当前token，获取供联运游戏使用的token
     *
     * @author arvin
     * @returns {Promise<{ userToken: string }[]>}
     */
    function getUserTokenByToken(): Promise<UserToken[]>

    /**
     * 是否登陆
     *
     * @author arvin
     * @returns {boolean}
     */
    function isLogin(): boolean

    /**
     * 获取绑定的手机号
     *
     * @author arvin
     * @export
     * @returns {Promise<PhoneInfo[]>}
     */
    function getBindPhone(): Promise<PhoneInfo[]>

    /**
     * 获取用户的实名信息
     *
     * @author arvin
     * @export
     * @returns {Promise<VerifyInfo[]>}
     */
    function getBindIdCard(): Promise<VerifyInfo[]>

    /**
     * 异步请求，该接口会自动带上token参数
     *
     * @author arvin
     * @param {string} url 接口地址
     * @param {Params} [param] 参数
     * @param {Method} [method] 请求方式
     * @param {AjaxRes} [responseType] 返回格式
     * @returns {Promise<unknown[]>} 返回值
     */
    function ajax(
        url: string, param?: Params, method?: Method, responseType?: AjaxRes
    ): Promise<unknown[]>

    /** 绑定手机，该接口必须catch，捕捉取消绑定的情况 */
    function bindPhone(args?: BindPhoneArgs): Promise<void>

    /** 解绑手机 */
    function unbindPhone(): Promise<void>

    /** 绑定身份证号，该接口必须catch，捕捉取消绑定的情况 */
    function bindIdCard(): Promise<void>

    /** 获取用户信息 */
    function getUserInfo(): Promise<UserInfo[]>

    /** 初始化爱微游iOS app */
    function initWebViewBridge(
        cb: (bridge: WebViewBridge) => void,
        /** 分享回调 */
        shareHandler?: (r: string) => void
    ): void

    /** 登出 */
    function loginOut(): void

    /** 获取用户协议 */
    function getRuleItems(): Promise<Window['YGITEMS']>

    /** 获取cps配置 */
    function getCpsConfig(): Promise<CPSConfigData[]>

    /**
     * 带登录态的重定向
     *
     * @author arvin
     * @param {string} url 目标地址
     * @param {Params} [args] 可选参数对象，额外携带的参数
     */
    function redirect(url: string, args?: Params): void
}
