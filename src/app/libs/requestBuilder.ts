import { CrudOperation } from "./crudOperations";
import { baseUrl } from "./crudOperations";
//import { useDataContext } from "../context/dataContext";

export default async function requestBuilder(operation: CrudOperation) {
    const { function: fnName, method, endpoint, parameters } = operation;
    let packageUrl;

    const packageParameters = Object.fromEntries(
        parameters
            .filter(({ value }) => value !== null && value !== undefined && value !== "")
            .map(({ name, value }) => [name, value])
    );

    if (method === "DELETE" || method === "GET") {
        if (packageParameters["courseId"]) {
            packageUrl = `${baseUrl}/${endpoint}/${packageParameters["courseId"]}`;
        } else {
            packageUrl = `${baseUrl}/${endpoint}`;
        }
    } else {
        packageUrl = `${baseUrl}/${endpoint}`;
    }

    const body = method !== "GET" && method !== "DELETE"
        ? { body: JSON.stringify(packageParameters) }
        : {};

    try {
        // Make the fetch request
        const res = await fetch(packageUrl, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            ...body
        });

        // Handle the response (if needed)
        if (res.ok) {
            const data = await res.json();
            console.log('Response data:', data);
            return data
        } else {
            console.error('Error with the request:', res.status, res.statusText);
        }
    } catch (err) {
        console.error("Error occurred in requestBuilder:", err);
    }
}
