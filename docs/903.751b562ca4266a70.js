"use strict";(self.webpackChunkjson_forms=self.webpackChunkjson_forms||[]).push([[903],{10903:(T,u,o)=>{o.r(u),o.d(u,{ImageDocsComponent:()=>U});var Z=o(18217),n=o(13740),c=o(86238),p=o(14383),s=o(84712),r=o(60095),e=o(65879),l=o(200);const g=function(){return{language:"json",automaticLayout:!0}};let U=(()=>{class d extends c._{constructor(){super(...arguments),this.schema={type:"object",properties:{image:{type:"string",errorMessage:"testing"}}},this.uiSchema={type:"VerticalLayout",elements:[{label:"",type:"Control",scope:"#/properties/image",options:{format:"image",hint:"You can upload JPG, PNG or GIF file",uploadUrl:"https://mocky.io/v3/0d4e05cd-4ce6-4061-a736-9d48a4869a9e",deleteUrl:"https://mocky.io/v3/0d4e05cd-4ce6-4061-a736-9d48a4869a9e",maxImageWidth:600,maxImageHeight:600,maxImageSizeMB:1}}]},this.data={image:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}}static#e=this.\u0275fac=function(){let i;return function(t){return(i||(i=e.n5z(d)))(t||d)}}();static#t=this.\u0275cmp=e.Xpm({type:d,selectors:[["app-image-docs"]],standalone:!0,features:[e.qOj,e.jDz],decls:141,vars:20,consts:[[3,"data","renderers","schema","uischema","dataChange"],[1,"flex"],[1,"editor",3,"ngModel","nzEditorOption","ngModelChange"],[3,"nzTemplateMode"],[1,"required"]],template:function(_,t){1&_&&(e.TgZ(0,"h1"),e._uU(1,"Upload Image control"),e.qZA(),e.TgZ(2,"jsonforms",0),e.NdJ("dataChange",function(a){return t.data=a}),e.qZA(),e.TgZ(3,"div",1)(4,"div")(5,"p"),e._uU(6,"Schema"),e.qZA(),e.TgZ(7,"nz-code-editor",2),e.NdJ("ngModelChange",function(a){return t.updateProperty("schema",a)}),e.ALo(8,"editorFormatter"),e.qZA(),e.TgZ(9,"p"),e._uU(10,"Ui Schema"),e.qZA(),e.TgZ(11,"nz-code-editor",2),e.NdJ("ngModelChange",function(a){return t.updateProperty("uiSchema",a)}),e.ALo(12,"editorFormatter"),e.qZA()(),e.TgZ(13,"div")(14,"p"),e._uU(15,"Data"),e.qZA(),e.TgZ(16,"nz-code-editor",2),e.NdJ("ngModelChange",function(a){return t.updateProperty("data",a)}),e.ALo(17,"editorFormatter"),e.qZA()()(),e.TgZ(18,"p"),e._uU(19,"UiSchema Options"),e.qZA(),e.TgZ(20,"nz-table",3)(21,"thead")(22,"tr")(23,"th"),e._uU(24,"Property"),e.qZA(),e.TgZ(25,"th"),e._uU(26,"Description"),e.qZA(),e.TgZ(27,"th"),e._uU(28,"Type"),e.qZA(),e.TgZ(29,"th"),e._uU(30,"Default"),e.qZA()()(),e.TgZ(31,"tbody")(32,"tr")(33,"td",4),e._uU(34,"format"),e.qZA(),e.TgZ(35,"td"),e._uU(36,"Makes control as image upload"),e.qZA(),e.TgZ(37,"td")(38,"code"),e._uU(39,"'image'"),e.qZA()(),e.TgZ(40,"td"),e._uU(41,"-"),e.qZA()(),e.TgZ(42,"tr")(43,"td",4),e._uU(44,"uploadUrl"),e.qZA(),e.TgZ(45,"td"),e._uU(46,"Url to upload files. Set to true if you use custom provider for JFZImageRendererService"),e.qZA(),e.TgZ(47,"td")(48,"code"),e._uU(49,"string | true"),e.qZA()(),e.TgZ(50,"td"),e._uU(51,"-"),e.qZA()(),e.TgZ(52,"tr")(53,"td"),e._uU(54,"hint"),e.qZA(),e.TgZ(55,"td"),e._uU(56,"Uploader hint"),e.qZA(),e.TgZ(57,"td")(58,"code"),e._uU(59,"string"),e.qZA()(),e.TgZ(60,"td"),e._uU(61,"-"),e.qZA()(),e.TgZ(62,"tr")(63,"td"),e._uU(64,"deleteUrl"),e.qZA(),e.TgZ(65,"td"),e._uU(66," If set enables option to remove image which requests on given url with DELETE method and "),e.TgZ(67,"code"),e._uU(68,"url: string"),e.qZA(),e._uU(69," in body. Set to true if you use custom provider for JFZImageRendererService "),e.qZA(),e.TgZ(70,"td")(71,"code"),e._uU(72,"string | true"),e.qZA()(),e.TgZ(73,"td"),e._uU(74,"-"),e.qZA()(),e.TgZ(75,"tr")(76,"td"),e._uU(77,"minImageWidth"),e.qZA(),e.TgZ(78,"td"),e._uU(79,"Minimum image width in px"),e.qZA(),e.TgZ(80,"td")(81,"code"),e._uU(82,"number"),e.qZA()(),e.TgZ(83,"td")(84,"code"),e._uU(85,"300"),e.qZA()()(),e.TgZ(86,"tr")(87,"td"),e._uU(88,"minImageminImageHeightWidth"),e.qZA(),e.TgZ(89,"td"),e._uU(90,"Minimum image height in px"),e.qZA(),e.TgZ(91,"td")(92,"code"),e._uU(93,"number"),e.qZA()(),e.TgZ(94,"td")(95,"code"),e._uU(96,"300"),e.qZA()()(),e.TgZ(97,"tr")(98,"td"),e._uU(99,"maxImageWidth"),e.qZA(),e.TgZ(100,"td"),e._uU(101,"Maximum image width in px"),e.qZA(),e.TgZ(102,"td")(103,"code"),e._uU(104,"number"),e.qZA()(),e.TgZ(105,"td")(106,"code"),e._uU(107,"9999"),e.qZA()()(),e.TgZ(108,"tr")(109,"td"),e._uU(110,"maxImageHeight"),e.qZA(),e.TgZ(111,"td"),e._uU(112,"Maximum image height in px"),e.qZA(),e.TgZ(113,"td")(114,"code"),e._uU(115,"number"),e.qZA()(),e.TgZ(116,"td")(117,"code"),e._uU(118,"9999"),e.qZA()()(),e.TgZ(119,"tr")(120,"td"),e._uU(121,"maxImageSizeMB"),e.qZA(),e.TgZ(122,"td"),e._uU(123,"Maximum image size in MB"),e.qZA(),e.TgZ(124,"td")(125,"code"),e._uU(126,"number"),e.qZA()(),e.TgZ(127,"td")(128,"code"),e._uU(129,"8"),e.qZA()()(),e.TgZ(130,"tr")(131,"td"),e._uU(132,"allowedExtensions"),e.qZA(),e.TgZ(133,"td"),e._uU(134,"List of allowed file extensions"),e.qZA(),e.TgZ(135,"td")(136,"code"),e._uU(137,"string[]"),e.qZA()(),e.TgZ(138,"td")(139,"code"),e._uU(140,"['image/jpeg', 'image/png', 'image/gif']"),e.qZA()()()()()),2&_&&(e.xp6(2),e.Q6J("data",t.data)("renderers",t.renderers)("schema",t.schema)("uischema",t.uiSchema),e.xp6(5),e.Q6J("ngModel",e.lcZ(8,11,t.schema.properties))("nzEditorOption",e.DdM(17,g)),e.xp6(4),e.Q6J("ngModel",e.lcZ(12,13,t.uiSchema.elements[0]))("nzEditorOption",e.DdM(18,g)),e.xp6(5),e.Q6J("ngModel",e.lcZ(17,15,t.data))("nzEditorOption",e.DdM(19,g)),e.xp6(4),e.Q6J("nzTemplateMode",!0))},dependencies:[Z.gUY,l.C,r.JJ,n.HQ,n.N8,n.Uo,n._C,n.Om,n.p0,n.$Z,p.c,s.qw,s.XZ,r.u5,r.On],styles:[".flex[_ngcontent-%COMP%]{margin-top:20px}.flex[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{margin-bottom:24px}"]})}return d})()}}]);