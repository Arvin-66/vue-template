/* eslint-disable no-unused-vars */
/*
 * @Author: arvin
 * @Date: 2020-10-15 20:27:30
 * @Last Modified by: Arvin
 * @Last Modified time: 2020-12-30 10:46:20
 */
/**
 * 短信码请求类型
 */
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

/**
 * 鉴权返回
 */
type checkData = {
    /**
     * 用户ID
     *
     * @type {number}
     */
    uid: number,
    /**
     * 凭证
     *
     * @type {string}
     */
    token?: string,
    /**
     * 归属的公众号
     *
     * @type {string}
     */
    belong: string,
    /**
     * 是否关注
     *
     * @type {number}
     */
    focus: number,
    /**
     * 是否是试玩账号
     *
     * @type {YN}
     */
    trial: YN,
    /**
     * 注册时间
     *
     * @type {number}
     */
    add_time: number
}

/** 登录选项 */
interface loginOptions {
    /**
     * 是否开启微信登录
     *
     * @type {boolean}
     */
    wechat: boolean;
    /**
     * 是否开启QQ登录
     *
     * @type {boolean}
     */
    qq: boolean;
    /**
     * 是否开启新浪登录
     *
     * @type {boolean}
     */
    sina: boolean;
    /**
     * 是否开启手机登录
     *
     * @type {boolean}
     */
    mobile: boolean;
    /**
     * 是否开启游光账号登录
     *
     * @type {boolean}
     */
    yg: boolean;
}

interface bindPhoneArgs {
    /** 礼包名称 */
    giftTitle?: string;
    /** 礼包内容 */
    giftBrief?: string;
}

/** 实名信息接口 */
interface VerifyInfo {
    /** 是否成年 1代表成年 */
    adult: YN;
    /** 身份证号 */
    idcard: string;
    /** 是否实名 1代表实名 */
    isVerify: YN;
    /** 姓名 */
    realname: string;
}

interface PhoneInfo {
    phone: string
}

interface UserInfo {
    /** 是否关注公众号 */
    focus: number

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

    /** 用户的uid  */
    uid: string

    /** 用户的VIP等级 */
    vip: number
}

interface CpsConfig {
    /** 是否显示app下载 */
    dlapp?: YN
    /** 是否显示关注 */
    focus?: YN
    /** 是否屏蔽游戏中心内容 */
    isDel?: YN
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

declare namespace AWY_LOGIN {

    /**
     * 登录初始化
     *
     * @author arvin
     * @returns {Promise<void>}
     */
    function init(): Promise<void>;

    /**
     * 调用登录界面
     *
     * @author arvin
     * @param {loginOptions} [options] 登录选项
     */
    function loadLoginPanel(options?: loginOptions): void;

    /**
     * 授权
     *
     * @author arvin
     * @param {boolean} [cache] 是否显性
     * @returns {Promise<void>}
     */
    function auth(cache?: boolean): Promise<void>

    /**
     * 根据当前token，获取code
     *
     * @author arvin
     * @returns {Promise<{ code: string }[]>}
     */
    function getCodeByToken(): Promise<{ code: string }[]>

    /**
     * 获取图片验证码
     *
     * @author arvin
     * @returns {Promise<void>}
     * @description 需要设置图片验证码的容器ID为 #e-getImgCode
     */
    function getImgCode(): Promise<void>;

    /**
     * 返回一个完整的国家码部分的结构字符串
     *
     * @author arvin
     * @returns {Promise<{ str: string }[]>}
     */
    function getNationCode(): Promise<{ str: string }[]>

    /**
     * 绑定请求短信验证码事件
     *
     * @author arvin
     * @param {SmsCodeType} type
     * @description 需要设置请求验证码按钮的ID为 #e-getSmsCodeBtn
     *
     * 图片验证码的输入框ID为 #e-imgCode
     */
    function getSmsCodeBind(type: SmsCodeType): void;

    /**
     * 更新短信验证码请求的type
     *
     * @author arvin
     * @param {SmsCodeType} type
     */
    function setSmsType(type: SmsCodeType): void;

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
     * 异步请求
     *
     * @author arvin
     * @param {string} url 接口地址
     * @param {Params} [param] 参数
     * @param {Method} [method] 请求方式
     * @param {AjaxRes} [responseType] 返回格式
     * @returns {Promise<any[]>} 返回值
     */
    function ajax(
        url: string, param?: Params, method?: Method, responseType?: AjaxRes
    ): Promise<any[]>

    /** 绑定手机，该接口必须catch，捕捉取消绑定的情况 */
    function bindPhone(args?: bindPhoneArgs): Promise<void>

    /** 解绑手机 */
    function unbindPhone(): Promise<void>

    /** 绑定身份证号，该接口必须catch，捕捉取消绑定的情况 */
    function bindIdCard(): Promise<void>

    /** 获取用户信息 */
    function getUserInfo(): Promise<UserInfo[]>

    /** 初始化爱微游iOS app */
    function initWebViewBridge(cb: (bridge: WebViewBridge) => void): void

    /** 登出 */
    function loginOut(): void

    /** 获取用户协议 */
    function getRuleItems(): Promise<Window['YGITEMS']>

    /** 获取cps配置 */
    function getCpsConfig(): Promise<CpsConfig[]>
}
