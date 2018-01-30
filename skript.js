/*<script type="text/javascript">*/
const _ID = 788;

var name_profile, soname_profile, email_profile, phone_profile, avatar_profile, client, modules_profile;
var API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA0ZGIzZjRkZTBiMmRkY2Q0NTlkNjM2M2QyOGExYzk0ZTYyODY4ZDllYWEzYzQzMDFhMWY0MzJmYWY4ZWU3ODczNGQyZDlkNGQ3NDNlNGExIn0.eyJhdWQiOiIxMCIsImp0aSI6IjA0ZGIzZjRkZTBiMmRkY2Q0NTlkNjM2M2QyOGExYzk0ZTYyODY4ZDllYWEzYzQzMDFhMWY0MzJmYWY4ZWU3ODczNGQyZDlkNGQ3NDNlNGExIiwiaWF0IjoxNTA5NjQxODMzLCJuYmYiOjE1MDk2NDE4MzMsImV4cCI6MTgyNTE3NDYzMywic3ViIjoiNzg4Iiwic2NvcGVzIjpbInVzZXJCYXNlSW5mbyIsInVzZXJEZXRhaWxlZEluZm8iLCJ1c2VyQ291cnNlSW5mbyJdfQ.bYn3UweotYQoqBUDKZMp9a0a3YctsxWxQ7tG8jIb530v8giazqTO6nSNAf2pS4OQclMPp1wGdvrx57xSxYcNyvATSBGkY6tO5DZCQVeMg62Dt7MrNOroXwxpsTPk_5qzBhgGXl6HMvzAZHGPneLDym5RUTLUvhnHlEEarp_pHMN7TYgwHh2iCU6Pb5T9zT-cYb-6l8JWkicr7qvS_IwYalQJeO4TgguCmDtoeWNkZN1tfl2CODaMzk_zdY1UeJZDVoTmtPSm3S5KViDCbSQaU-e9VIHSsNrgb9Vt-ZZ_Frw06U2z7mIUGA6UAstoQz_GA5nYqAzVOLTMXSQIzIIFnYUUxsjgtLXjzuPDb9pYGBNtWxNpr-gXlWcMPZbpmpE3gX_-RiGZ6WZgLoSDCfuaz-uYg0zpUnHJphB1S65HudbLeWETGbH4KNB6syxH0Jq1JcNU5K4awAmnQ3PEyOfC17hwIQQFX5y_V83meSIt4MuPNv631ZezrHg9VFLqrMm1rLhgkxKvGyfxUDmt3dRTb2WNlhNHS3QXORW15irCEy2wIFTQRGgcUQeQXakXoSnmMDQyc2rUTMdLorkosG9JEhsmXWn2aeWQ31-58_m49RVR0DPsjmYP8pGUUTRmV4xd3AsJb46YBMKCWPbZSlxG9WonKLMtGSFbMR-dSxvITNE';
client = new INTITAClient({key: API_KEY});
client.getUserDetails(_ID, function (error, data) {
    //console.log(error, data)
    name_profile = document.getElementById("name_profile");
    name_profile.innerHTML = data.firstName;
    soname_profile = document.getElementById("soname_profile");
    soname_profile.innerHTML = data.secondName;
    email_profile = document.getElementById("email_profile");
    email_profile.innerHTML = data.email;
    phone_profile = document.getElementById("phone_profile");
    phone_profile.innerHTML = data.phone;
    avatar_profile = document.getElementById("avatar_profile");
    avatar_profile.src = data.avatar;
});
client.getUserCoursesAndModules(_ID, function (error, data) {
    var mainCourse = data.courses[0].id;

    client.getCourseInfo(mainCourse, function (error, data) {
        //console.log(error, data);
        modules_profile = document.getElementById("modules_profile");
        modules_profile.innerHTML = data.title_ua;

    });
    client.getCourseModules(mainCourse, function (error, modules) {
        modules.forEach(function (module) {
            //console.log(module.title);
            var course = document.getElementById("submenu");
            var tagLi = document.createElement("li");
            tagLi.innerHTML = module.title;
            tagLi.className = 'class_modeles';
            course.appendChild(tagLi);

            var Lect_ul = document.createElement("ul");
            Lect_ul.id = module.id;
            Lect_ul.className = "lectures";
            tagLi.appendChild(Lect_ul);

            client.getModuleLectures(module.id, function (error, lectures) {
                lectures.forEach(function (lecture) {
                    //console.log(lecture.title);
                    var Lect_li = document.createElement("li");
                    Lect_li.id = lecture.id;
                    Lect_li.innerHTML = lecture.title;
                    Lect_li.className = 'class_lectures';
                    Lect_ul.appendChild(Lect_li);
                });
            });
        })
    })
});
var modules = document.getElementsByClassName('class_modeles');
var title = document.getElementsByClassName('lectures');
for (var i = 0; i < modules.length; i++){
    modules[i].addEventListener('click',function () {
        if(!(this.classList.contains('active'))){
            for(var i = 0; i < title.length; i++){
                title[i].classList.remove('active');
            }
            this.title.add('active');
        }
    })
}
/*</script>*/