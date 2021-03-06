//loadUser - loads in the user
const loadUser = () => {
    sendAjax('GET', '/getUser', null, (data) => {
        let title = document.querySelector("#title");
        ReactDOM.render(
            <h3 id="userProfile">Current User: {data.username}</h3>, document.querySelector("#userProfile")
        );
    });
};

//handleCourse - handles errors and loads up the courses
const handleCourse = (e) => {
    e.preventDefault();

    $("#courseMessage").animate({ width: 'hide' }, 350);

    if ($("courseName").val() == '' || $("#courseNumber").val() == '') {
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#courseForm").attr("action"), $("#courseForm").serialize(), function () {
        loadCoursesFromServer();
    });

    return false;
};

//deleteCourse - removes course block
const deleteCourse = (e) => {
    e.preventDefault();

    $("#courseMessage").animate({ width: 'hide' }, 350);

    sendAjax('DELETE', $("#deleteForm").attr("action"), $("#deleteForm").serialize(), function () {
        loadCoursesFromServer();
    });

    return false;
};

//CourseForm - sets up the html to create a class
const CourseForm = (props) => {
    console.log(props);
    return (
        <form id="courseForm" onSubmit={handleCourse} name="courseForm" action="/maker" method="POST" className="courseForm">
            <label htmlFor="name">Name: </label>
            <input id="courseName" type="text" name="name" placeholder="Rich Media Web App Dev II"/>

            <label htmlFor="credit">Credit: </label>
            <input id="courseCredit" type="text" name="credit" placeholder="3" />

            <br />
            <br />

            <label htmlFor="department">Department: </label>
            <input id="courseDepartment" type="text" name="department" placeholder="IGME"/>

            <label htmlFor="number">Number: </label>
            <input id="courseNumber" type="text" name="number" placeholder="430"/>

            <br />
            <br />

            <label htmlFor="days">Days: </label>
            <input id="courseDays" type="text" name="days" placeholder="MWF" />

            <label htmlFor="times">Times: </label>
            <input id="courseTimes" type="text" name="times" placeholder="1:25-2:15" />


            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeCourseSubmit" type="submit" value="Make Course"/>
        </form>
    );
};

//DeleteForm - sets up the html for the deletion process
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

// const UpgradeForm = (props) => {
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
                {/* <img src="/assets/img/courseface.png" alt="course face" className="courseFace"/> */}
                <h3 className="courseName"> {course.name}</h3>

                <h3 className="courseNumber" className="courseDepartment" className="courseCredit"> {course.department} {course.number} <br /> {course.credit} credits</h3>

                <h3 className="courseDays" className="courseTimes">{course.days} {course.times}</h3>
            </div>
        );
    });

    return (
        <div className="courseList">
            {courseNodes}
        </div>
    );
};

//loadCoursesFromServer - has the course blocks appear
const loadCoursesFromServer = () => {
    sendAjax('GET', '/getCourses', null, (data) => {
        ReactDOM.render(
            <CourseList courses={data.courses} />, document.querySelector("#courses")
        );
    });
};

//setup - makes everything appear and work
const setup = function(csrf) {
    ReactDOM.render(
        <CourseForm csrf={csrf} />, document.querySelector("#makeCourse")
    );

    // ReactDOM.render(
    //     <UpgradeForm csrf={csrf} />, document.querySelector("#upgradeCourse")
    // );

    ReactDOM.render(
        <DeleteForm csrf={csrf} />, document.querySelector("#deleteCourse")
    );

    ReactDOM.render(
        <CourseList courses={[]} />, document.querySelector("#courses")
    );

    loadCoursesFromServer();
    loadUser();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});