"use strict";

var handleCourse = function handleCourse(e) {
  e.preventDefault();
  $("#courseMessage").animate({
    width: 'hide'
  }, 350);

  if ($("courseName").val() == '' || $("#courseAge").val() == '') {
    handleError("RAWR! All fields are required!");
    return false;
  }

  sendAjax('POST', $("#courseForm").attr("action"), $("#courseForm").serialize(), function () {
    loadCoursesFromServer();
  });
  return false;
};

var deleteCourse = function deleteCourse(e) {
  e.preventDefault();
  $("#courseMessage").animate({
    width: 'hide'
  }, 350);
  sendAjax('DELETE', $("#deleteForm").attr("action"), $("#deleteForm").serialize(), function () {
    loadCoursesFromServer();
  });
  return false;
};

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
    placeholder: "Course Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "age"
  }, "Age: "), /*#__PURE__*/React.createElement("input", {
    id: "courseAge",
    type: "text",
    name: "age",
    placeholder: "Course Age"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "level"
  }, "Level: "), /*#__PURE__*/React.createElement("input", {
    id: "courseLevel",
    type: "text",
    name: "level",
    placeholder: "Course Level"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeCourseSubmit",
    type: "submit",
    value: "Make Course"
  }));
};

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
};

var CourseList = function CourseList(props) {
  if (props.courses.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "courseList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyCourse"
    }, "No Courses yet"));
  }

  var courseNodes = props.courses.map(function (course) {
    return /*#__PURE__*/React.createElement("div", {
      key: course._id,
      className: "course"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/courseface.png",
      alt: "course face",
      className: "courseFace"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "courseName"
    }, " Name: ", course.name, " "), /*#__PURE__*/React.createElement("h3", {
      className: "courseAge"
    }, " Age: ", course.age, " "), /*#__PURE__*/React.createElement("h3", {
      className: "courseLevel"
    }, "Level: ", course.level));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "courseList"
  }, courseNodes);
};

var loadCoursesFromServer = function loadCoursesFromServer() {
  sendAjax('GET', '/getCourses', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CourseList, {
      courses: data.courses
    }), document.querySelector("#courses"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(CourseForm, {
    csrf: csrf
  }), document.querySelector("#makeCourse"));
  ReactDOM.render( /*#__PURE__*/React.createElement(DeleteForm, {
    csrf: csrf
  }), document.querySelector("#deleteCourse"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CourseList, {
    courses: []
  }), document.querySelector("#courses"));
  loadCoursesFromServer();
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
};

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
