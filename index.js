var conToken = "90937492|-31949291318432750|90942809"
var url = "http://api.login2explore.com:5577/"
var endpointiml = "api/iml"
var endpointirl = "api/irl"
var dbName = "SCHOOL-DB"
var dbRelation = "STUDENT-TABLE "
destructor()
function destructor() {
$("#Roll-No").focus();
$("#Full-Name").prop("disabled", true)
$("#Class").prop("disabled", true)
$("#Birth-Date").prop("disabled", true)
$("#Address").prop("disabled", true)
$("#Enrollment-Date").prop("disabled", true)
}

function construct() {
    $("#Full-Name").prop("disabled", false)
    $("#Class").prop("disabled", false)
    $("#Birth-Date").prop("disabled", false)
    $("#Address").prop("disabled", false)
    $("#Enrollment-Date").prop("disabled", false)
}

function getstudent() {
    var stIdJsonObj = getstIdAsjsonObject();
    var getReq = createGET_BY_KEYRequest(conToken, dbName, dbRelation, stIdJsonObj);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(getReq, url, endpointirl);
    jQuery.ajaxSetup({ async: false });
    if (resultObj.status == 400) {
        $("#resetdata").prop("disabled", false)
        $("#savedata").prop("disabled", false)
        construct();
        $("#Full-Name").focus();
    } else if (resultObj.status == 200) {
        $("#Roll-No").prop("disabled", true)
        fillform(resultObj);
        construct()
        $("#resetdata").prop("disabled", false)
        $("#changedata").prop("disabled", false)
        $("#Full-Name").focus();
    }
}
function fillform(resultObj) {
    var record = JSON.parse(resultObj.data).record;
    $("#Roll-No").val(record.stId)
    $("#Full-Name").val(record.stName);
    $("#Class").val(record.stClass);
    $("#Birth-Date").val(record.stDob)
    $("#Address").val(record.stAddress);
    $("#Enrollment-Date").val(record.stDoe);
}
function getstIdAsjsonObject() {
    var roll = $("#Roll-No").val();
    var jsonStr = {
        stId: roll
    };
    return JSON.stringify(jsonStr);
}

function resetform() {
    $("#Roll-No").val("")
    $("#Full-Name").val("");
    $("#Class").val("");
    $("#Birth-Date").val("")
    $("#Address").val("");
    $("#Enrollment-Date").val("");
    $("#Roll-No").prop("disabled", false)
    $("#savedata").prop("disabled", true)
    $("#changedata").prop("disabled", true)
    $("#resetdata").prop("disabled", true)
    destructor()
    $("#Roll-No").focus();
}

function validateAndGetFormData() {
    var roll = $("#Roll-No").val();
    if (roll === "") {
        alert("Roll no. Required Value");
        $("#Roll-No").focus();
        return "";
    }
    var Name = $("#Full-Name").val();
    if (Name === "") {
        alert("Student name Required Value");
        $("#Full-Name").focus();
        return "";
    }
    var Class = $("#Class").val();
    if (Class === "") {
        alert("Class is Required Value");
        $("#Class").focus();
        return "";
    }
    var dob = $("#Birth-Date").val();
    if (dob === "") {
        alert("Date of Birth is Required Value");
        $("#Birth-Date").focus();
        return "";
    }
    var Address = $("#Address").val();
    if (Address === "") {
        alert("Address is Required Value");
        $("#Address").focus();
        return "";
    }
    var doe = $("#Enrollment-Date").val();
    if (doe === "") {
        alert("Date of Enrollment is Required Value");
        $("#Enrollment-Date").focus();
        return "";
    }
    var jsonStrObj = {
        stId: roll,
        stName: Name,
        stClass: Class,
        stDob: dob,
        stAddress: Address,
        stDoe: doe
    };
    return JSON.stringify(jsonStrObj);
}

function saveform() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(conToken, jsonStr, dbName, dbRelation);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, url, endpointiml);
    jQuery.ajaxSetup({ async: true });
    resetform();
}
function changeform() {
    $("#changedata").prop("disabled", true)
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var updateReqStr = createUPDATERecordRequest(conToken, jsonStr, dbName, dbRelation, $("#Roll-No").val());
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(updateReqStr, url, endpointiml);
    jQuery.ajaxSetup({ async: true });
    resetform();
    $("#Roll-No").focus();
}

