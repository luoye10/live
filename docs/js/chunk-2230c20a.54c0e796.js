(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2230c20a"],{1954:function(e,r,s){"use strict";s.r(r);var o=function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",{staticClass:"login"},[s("div",{staticClass:"container"},[s("el-form",{ref:"loginForm",attrs:{model:e.ruleForm,rules:e.rules}},[s("el-form-item",{attrs:{placeholder:"用户名",prop:"username"}},[s("el-input",{model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1),s("el-form-item",{attrs:{placeholder:"密码",prop:"password"}},[s("el-input",{attrs:{type:"password"},nativeOn:{keyup:function(r){return!r.type.indexOf("key")&&e._k(r.keyCode,"enter",13,r.key,"Enter")?null:e.login.apply(null,arguments)}},model:{value:e.ruleForm.password,callback:function(r){e.$set(e.ruleForm,"password",r)},expression:"ruleForm.password"}})],1)],1),s("el-button",{attrs:{type:"primary"},on:{click:e.login}},[e._v("登录")])],1)])},n=[],t=s("365c"),a={data:function(){var e=function(e,r,s){var o=/.{8,}/;r?o.test(r)?s():s(new Error("密码最少为8个字符")):s(new Error("密码不能为空"))};return{ruleForm:{username:"",password:""},rules:{username:[{required:!0,message:"用户名不能为空",trigger:"blur"}],password:[{required:!0,validator:e,trigger:"blur"}]}}},methods:{login:function(){var e=this;this.$refs["loginForm"].validate((function(r){r?e.loginRequest():console.log("rules验证没通过")}))},loginRequest:function(){var e=this;t["a"].login({params:{phone:this.ruleForm.username,password:this.ruleForm.password}}).then((function(r){var s=r.data;if(200===s.code){var o=JSON.stringify(s);localStorage.setItem("userInfo",o),e.$message.success("登录成功"),e.$router.push({name:"main"})}else e.$message.error(s.msg||"账号或密码错误")})).catch((function(e){console.log(e)}))}}},l=a,u=(s("899e"),s("2877")),i=Object(u["a"])(l,o,n,!1,null,"a25292f6",null);r["default"]=i.exports},"899e":function(e,r,s){"use strict";s("e38b")},e38b:function(e,r,s){}}]);
//# sourceMappingURL=chunk-2230c20a.54c0e796.js.map