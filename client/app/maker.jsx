const handleCourse = (e) => {
    e.preventDefault();

    $("#courseMessage").animate({ width: 'hide' }, 350);

    if ($("courseName").val() == '' || $("#courseAge").val() == '') {
        handleError("RAWR! All fields are required!");
        return false;
    }

    sendAjax('POST', $("#courseForm").attr("action"), $("#courseForm").serialize(), function () {
        loadCoursesFromServer();
    });

    return false;
};

const deleteCourse = (e) => {
    e.preventDefault();

    $("#courseMessage").animate({ width: 'hide' }, 350);

    sendAjax('DELETE', $("#deleteForm").attr("action"), $("#deleteForm").serialize(), function () {
        loadCoursesFromServer();
    });

    return false;
};

const CourseForm = (props) => {
    console.log(props);
    return (
        <form id="courseForm" onSubmit={handleCourse} name="courseForm" action="/maker" method="POST" className="courseForm">
            <label htmlFor="name">Name: </label>
            <input id="courseName" type="text" name="name" placeholder="Course Name"/>

            <label htmlFor="age">Age: </label>
            <input id="courseAge" type="text" name="age" placeholder="Course Age"/>

            <label htmlFor="level">Level: </label>
            <input id="courseLevel" type="text" name="level" placeholder="Course Level" />

            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeCourseSubmit" type="submit" value="Make Course"/>
        </form>
    );
};

const DeleteForm = (props) => {
    return (
        <form id="deleteForm"
            onSubmit={deleteCourse}
            name="deleteForm"
            action="/delete"
            method="DELETE"
            className="deleteForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="courseName" type="text" name="name" placeholder="Course Name" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="deleteSubmit" type="submit" value="Delete Course" />
        </form>
    );
};

const CourseList = function(props) {
    if(props.courses.length === 0) {
        return (
            <div className="courseList">
                <h3 className="emptyCourse">No Courses yet</h3>
            </div>
        );
    }

    const courseNodes = props.courses.map(function(course) {
        return (
            <div key={course._id} className="course">
                <img src="/assets/img/courseface.png" alt="course face" className="courseFace"/>
                <h3 className="courseName"> Name: {course.name} </h3>

                <h3 className="courseAge"> Age: {course.age} </h3>

                <h3 className="courseLevel">Level: {course.level}</h3>
            </div>
        );
    });

    return (
        <div className="courseList">
            {courseNodes}
        </div>
    );
};

const loadCoursesFromServer = () => {
    sendAjax('GET', '/getCourses', null, (data) => {
        ReactDOM.render(
            <CourseList courses={data.courses} />, document.querySelector("#courses")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <CourseForm csrf={csrf} />, document.querySelector("#makeCourse")
    );

    ReactDOM.render(
        <DeleteForm csrf={csrf} />, document.querySelector("#deleteCourse")
    );

    ReactDOM.render(
        <CourseList courses={[]} />, document.querySelector("#courses")
    );

    loadCoursesFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});