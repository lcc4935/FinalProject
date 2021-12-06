"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//loadUser - loads in the user
var loadUser = function loadUser() {
  sendAjax('GET', '/getUser', null, function (data) {
    var title = document.querySelector("#title");
    ReactDOM.render( /*#__PURE__*/React.createElement("h3", {
      id: "userProfile"
    }, "Current User: ", data.username), document.querySelector("#userProfile"));
  });
}; //handleCourse - handles errors and loads up the courses


var handleCourse = function handleCourse(e) {
  e.preventDefault();
  $("#courseMessage").animate({
    width: 'hide'
  }, 350);

  if ($("courseName").val() == '' || $("#courseNumber").val() == '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#courseForm").attr("action"), $("#courseForm").serialize(), function () {
    loadCoursesFromServer();
  });
  return false;
}; //deleteCourse - removes course block


var deleteCourse = function deleteCourse(e) {
  e.preventDefault();
  $("#courseMessage").animate({
    width: 'hide'
  }, 350);
  sendAjax('DELETE', $("#deleteForm").attr("action"), $("#deleteForm").serialize(), function () {
    loadCoursesFromServer();
  });
  return false;
}; //CourseForm - sets up the html to create a class


var CourseForm = function CourseForm(props) {
  console.log(props);
  return /*#__PURE__*/React.createElement("form", {
    id: "courseForm",
    onSubmit: handleCourse,
    name: "courseForm",
    action: "/maker",
    method: "POST",
    className: "courseForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "courseName",
    type: "text",
    name: "name",
    placeholder: "Rich Media Web App Dev II"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "credit"
  }, "Credit: "), /*#__PURE__*/React.createElement("input", {
    id: "courseCredit",
    type: "text",
    name: "credit",
    placeholder: "3"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    htmlFor: "department"
  }, "Department: "), /*#__PURE__*/React.createElement("input", {
    id: "courseDepartment",
    type: "text",
    name: "department",
    placeholder: "IGME"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "number"
  }, "Number: "), /*#__PURE__*/React.createElement("input", {
    id: "courseNumber",
    type: "text",
    name: "number",
    placeholder: "430"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    htmlFor: "days"
  }, "Days: "), /*#__PURE__*/React.createElement("input", {
    id: "courseDays",
    type: "text",
    name: "days",
    placeholder: "MWF"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "times"
  }, "Times: "), /*#__PURE__*/React.createElement("input", {
    id: "courseTimes",
    type: "text",
    name: "times",
    placeholder: "1:25-2:15"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeCourseSubmit",
    type: "submit",
    value: "Make Course"
  }));
}; //DeleteForm - sets up the html for the deletion process


var DeleteForm = function DeleteForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "deleteForm",
    onSubmit: deleteCourse,
    name: "deleteForm",
    action: "/delete",
    method: "DELETE",
    className: "deleteForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "courseName",
    type: "text",
    name: "name",
    placeholder: "Course Name"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "deleteSubmit",
    type: "submit",
    value: "Delete Course"
  }));
}; // const UpgradeForm = (props) => {
//     return (
//         <form id="upgradeForm"
//             onSubmit={upgradeCourse}
//             name="upgradeForm"
//             action="/upgrade"
//             method="UPGRADE"
//             className="upgradeForm"
//         >
//             <input type="hidden" name="_csrf" value={props.csrf} />
//             <input className="upgradeSubmit" type="submit" value="Upgrade to add more courses" />
//         </form>
//     );
// };
//courseList - sets up the course blocks


var CourseList = function CourseList(props) {
  if (props.courses.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "courseList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyCourse"
    }, "No Courses yet"));
  }

  var courseNodes = props.courses.map(function (course) {
    var _React$createElement;

    return /*#__PURE__*/React.createElement("div", {
      key: course._id,
      className: "course"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "courseName"
    }, " ", course.name), /*#__PURE__*/React.createElement("h3", (_React$createElement = {
      className: "courseNumber"
    }, _defineProperty(_React$createElement, "className", "courseDepartment"), _defineProperty(_React$createElement, "className", "courseCredit"), _React$createElement), " ", course.department, " ", course.number, " ", /*#__PURE__*/React.createElement("br", null), " ", course.credit, " credits"), /*#__PURE__*/React.createElement("h3", _defineProperty({
      className: "courseDays"
    }, "className", "courseTimes"), course.days, " ", course.times));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "courseList"
  }, courseNodes);
}; //loadCoursesFromServer - has the course blocks appear


var loadCoursesFromServer = function loadCoursesFromServer() {
  sendAjax('GET', '/getCourses', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CourseList, {
      courses: data.courses
    }), document.querySelector("#courses"));
  });
}; //setup - makes everything appear and work


var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(CourseForm, {
    csrf: csrf
  }), document.querySelector("#makeCourse")); // ReactDOM.render(
  //     <UpgradeForm csrf={csrf} />, document.querySelector("#upgradeCourse")
  // );

  ReactDOM.render( /*#__PURE__*/React.createElement(DeleteForm, {
    csrf: csrf
  }), document.querySelector("#deleteCourse"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CourseList, {
    courses: []
  }), document.querySelector("#courses"));
  loadCoursesFromServer();
  loadUser();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#courseMessage").animate({
    width: 'toggle'
  }, 350);
}; //redirect


var redirect = function redirect(response) {
  $("#courseMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
