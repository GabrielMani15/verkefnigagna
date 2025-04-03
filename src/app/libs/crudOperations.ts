
//This file only stores the data needed to operate the api endpoints

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface Parameter {
    name: string;
    type: string;
    value?: string;
    required: boolean;
}

export interface CrudOperation {
  function: string;
  method: HttpMethod;
  endpoint: string;
  parameters: Parameter[];
}

interface CrudOperations {
  Courses: CrudOperation[];
  Trackcourses: string[];
  Semester: string[];
}

export const port = "5000"
export const baseUrl = `http://localhost:${port}`

export const crudOperations: CrudOperations  = {
    Courses: [
      {
        function: "addCourse",
        method: "POST",
        endpoint: "addCourse",
        parameters: [
          { name: "courseId", type: "string", required: true},
          { name: "courseName", type: "string", required: true },
          { name: "courseCredits", type: "string", required: true},
        ],
      },
      {
        function: "getCourse",
        method: "GET",
        endpoint: "getCourse",
        parameters: [
          { name: "courseId", type: "string", required: true},
        ],
      },
      {
        function: "updateCourse",
        method: "PUT",
        endpoint: "updateCourse",
        parameters: [
          { name: "courseId", type: "string", required: true},
          { name: "courseName", type: "string",required: true},
          { name: "courseCredits", type: "string", required: true},
        ],
      },
      {
        function: "deleteCourse",
        method: "DELETE",
        endpoint: "deleteCourse",
        parameters: [{ name: "courseId", type: "string", required: true}],
      },
      {
        function: "read_courses",
        method: "GET",
        endpoint: "readCourses",
        parameters: [],
      },
    ],
    Trackcourses: [
      "createTrackCourse",
      "readTrackCourse",
      "updateTrackCourse",
      "deleteTrackCourse",
      "getTrackCourse",
    ],
    Semester: [
      "createSemester",
      "readSemester",
      "updateSemesters",
      "deleteSemester",
      "getSemester",
    ],
  };