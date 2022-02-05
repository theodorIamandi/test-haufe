export const getXHR = (data, success, error) => {
    let headers = data.auth;
    let querystring = "?";

    headers['Content-Type'] = 'application/json';

    if(Object.keys(data.data).length > 0)
        querystring = ("?" + buildQueryString({ obj: data.data }))

    let payload = {
        init: {
            method: "GET",
            headers: headers
        },
        url: data.action + querystring
    }
    processXHR(payload, success, error);
};

export const postXHR = (data, success, error) => {
    let headers = data.auth;
    let body = data.data;

    headers['Content-Type'] = 'application/json';

    let payload = {
        init: {
            method: "POST",
            mode: 'cors',
            credentials: "same-origin",
            headers: headers,
            body: JSON.stringify(body),
        },
        url: data.action
    }
    processXHR(payload, success, error);
};

export const putXHR = (data, success, error) => {
    let headers = data.auth;

    headers['Content-Type'] = 'application/json';
    headers['Content-Length'] = Buffer.byteLength(JSON.stringify(data.data));

    let payload = {
        init: {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(data.data)
        },
        url: data.action
    }
    processXHR(payload, success, error);
};

export const deleteXHR = (data, success, error) => {
    let payload = {
        init: {
            method: "DELETE",
            headers: data.auth
        },
        url: data.action
    }

    processXHR(payload, success, error);
};

const processXHR = (payload, success, fail) => {
    fetch(payload.url, payload.init)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            success(data);
        })
        .catch((error) => {
            fail(error)
        });
};

const buildQueryString = (data) => {
    let keys = Object.keys(data.obj);
    let querystring = "";

    for(let i = 0; i < keys.length; i++) {
        //let key = keys[i];
    }

    return querystring;
}