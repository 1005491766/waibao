import * as CryptoJS from "./aes.js"

export default class AesTools_csjc
{
    private static readonly KEY = 'b#63fFJ6AvkK3YT*';
    private static readonly IV = 'J$f4DU%sNL73M&Go';

    //加密
    public static encrypt_csjc(str: string) {
        var key = CryptoJS.enc.Utf8.parse(AesTools_csjc.KEY);// 秘钥
        var iv = CryptoJS.enc.Utf8.parse(AesTools_csjc.IV);//向量iv
        var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    }

    //解密
    public static decrypt_csjc(str: string) {
        var key = CryptoJS.enc.Utf8.parse(AesTools_csjc.KEY);// 秘钥
        var iv = CryptoJS.enc.Utf8.parse(AesTools_csjc.IV);//向量iv
        var decrypted = CryptoJS.AES.decrypt(str, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
    
    
}