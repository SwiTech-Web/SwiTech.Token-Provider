function doGet(e){
    var json;
    if(Object.getOwnPropertyNames(e.parameter).length > 0){
        if(e.parameter.action != undefined){
            if(e.parameter.action == "refresh"){
                if(e.parameter.email != undefined){
                    var token = ScriptApp.newStateToken().createToken();
                    PropertiesService.getScriptProperties().setProperty(e.parameter.email + "_TOKEN", token).setProperty(e.parameter.email + "_EXPIRE", new Date());
                    json = {
                        "data": {
                            "code": 200,
                            "details": "Token Refreshed",
                            "token": token
                        }
                    };
                    return ContentService.createTextOutput(JSON.stringify(json));
                } else {
                    json = {
                        "data": {
                            "code": 400,
                            "details": "Bad Request"
                        }
                    };
                    return ContentService.createTextOutput(JSON.stringify(json));
                }
            } else if(e.parameter.action == "checkvalidity"){
                if(e.parameter.token != undefined && e.parameter.email != undefined){
                    if(e.parameter.token == PropertiesService.getScriptProperties().getProperty(e.parameter.email + "_TOKEN")){
                        if(Math.floor((Math.abs(new Date() - new Date(PropertiesService.getScriptProperties().getProperty(e.parameter.email + "_EXPIRE"))) / 1000) / 60) < 60){
                            json = {
                                "data": {
                                    "code": 200,
                                    "details": "Valid Token"
                                }
                            };
                            return ContentService.createTextOutput(JSON.stringify(json));
                        } else {
                            json = {
                                "data": {
                                    "code": 401,
                                    "details": "Token Expired"
                                }
                            };
                            return ContentService.createTextOutput(JSON.stringify(json));
                        }
                    } else {
                        json = {
                            "data": {
                                "code": 403,
                                "details": "Invalid Token"
                            }
                        };
                        return ContentService.createTextOutput(JSON.stringify(json));
                    }
                } else {
                    json = {
                        "data": {
                            "code": 400,
                            "details": "Bad Request"
                        }
                    };
                    return ContentService.createTextOutput(JSON.stringify(json));
                }
            } else {
                json = {
                    "data": {
                        "code": 400,
                        "details": "Bad Request"
                    }
                };
                return ContentService.createTextOutput(JSON.stringify(json));
            }
        } else {
            json = {
                "data": {
                    "code": 400,
                    "details": "Bad Request"
                }
            };
            return ContentService.createTextOutput(JSON.stringify(json));
        }
    } else {
        json = {
            "data": {
                "code": 400,
                "details": "Bad Request"
            }
        };
        return ContentService.createTextOutput(JSON.stringify(json));
    }
}
