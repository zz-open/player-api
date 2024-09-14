import assert from 'assert';
import { tecentZzcSign } from '../../common/utils/index.js';
import qs from 'qs'

describe("tecent_music_api", () => {
    test('sign', () => {
        let data = {"comm":{"cv":4747474,"ct":24,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"yqq.json","needNewCode":1,"uin":373045134,"g_tk_new_20200303":802375924,"g_tk":2090557760},"req_1":{"method":"GetCommentCount","module":"music.globalComment.GlobalCommentRead","param":{"request_list":[{"biz_type":3,"biz_id":"8028674314"}]}},"req_2":{"module":"music.musicasset.PlaylistFavRead","method":"IsPlaylistFan","param":{"v_tid":[8028674314]}},"req_3":{"module":"music.globalComment.CommentRead","method":"GetNewCommentList","param":{"BizType":3,"BizId":"8028674314","LastCommentSeqNo":"","PageSize":25,"PageNum":0,"FromCommentId":"","WithHot":1,"PicEnable":1,"LastTotal":0,"LastTotalVer":"0"}},"req_4":{"module":"music.globalComment.CommentRead","method":"GetHotCommentList","param":{"BizType":3,"BizId":"8028674314","LastCommentSeqNo":"","PageSize":15,"PageNum":0,"HotType":2,"WithAirborne":1,"PicEnable":1}},"req_5":{"module":"music.globalComment.CommentAsset","method":"GetCmBgCard","param":{}}}
        data = qs.stringify(data)
    
        const sign = "zzcaa2dbd3welfu2iztlyn5zrbrxrw6ue8qub16734bc"
        expect(tecentZzcSign(data)).toBe(sign);
    });
})
