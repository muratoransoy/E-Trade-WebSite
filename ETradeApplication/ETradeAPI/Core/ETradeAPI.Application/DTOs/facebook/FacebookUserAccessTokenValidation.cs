using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ETradeAPI.Application.DTOs.facebook
{
    public class FacebookUserAccessTokenValidation
    {
        [JsonPropertyName("data")]
        public FacebookUserAccessTokenValidationData Data { get; set; }
    }
    public class FacebookUserAccessTokenValidationData
    {
        [JsonPropertyName("is_valid")]
        public bool IsValid { get; set; }
        [JsonPropertyName("user_id")]
        public string UserId { get; set; }

    }
}

//{ "data":{ "app_id":"676874660627299","type":"USER","application":"E-Trade Application","data_access_expires_at":1700230871,"expires_at":1692460800,"is_valid":true,"scopes":["email","public_profile"],"user_id":"6415323625188067"} }