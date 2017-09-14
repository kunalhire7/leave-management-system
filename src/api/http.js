import fetch from 'isomorphic-fetch'
import qs from 'qs'

export const config = {
    serverUrl: "http://localhost:9000"
};

export const Accept = "Accept";
export const ContentType = "Content-Type";
export const APPLICATION_JSON = 'application/json';

const populateAuthorizationHeader = (params) => {
    // let token = localStorage.getItem(constants.AUTH_TOKEN);
    // token = token ? JSON.parse(token) : null;
    // if (token) {
    //     params.headers = Object.assign({}, params.headers, {
    //         Authorization: `${token.token_type} ${token.access_token}`
    //     });
    // }

    return params;
};

const interceptedFetch = (dispatch, uri, params) => {
    return fetch(uri, populateAuthorizationHeader(params))
        .then(resp => {
            if (!dispatch) return resp;

            // const refererRoute = utils.getPathName()
            // if (resp.status === 401 && refererRoute !== '/login') {
            //     dispatch(commonActions.updateRefererRoute(refererRoute))
            //     dispatch(commonActions.navigateToLogin())
            // }

            return resp
        });
};

function trimAllStrings(obj) {
    for (var key in obj) {
        if (obj[key] && obj[key].constructor === Object) {
            trimAllStrings(obj[key]);
        } else if (obj[key] && obj[key].constructor === String) {
            obj[key] = obj[key].trim();
        }
    }
}

const request = (dispatch, method, uri, params, headers = {}) => {
    const multipart = params && params.constructor === FormData;

    // Accept headers
    if (method !== 'GET' && !multipart) {
        headers[ContentType] = headers[ContentType] || APPLICATION_JSON
    }
    if (!multipart) {
        headers[Accept] = headers[Accept] || APPLICATION_JSON
    }

    // Query string
    if (method === 'GET' && params) {
        const query = qs.stringify(params, { encode: false, arrayFormat: 'brackets' })
        uri += query ? '?' + query : ''
    }

    // JSON body
    const options = { method, headers };
    if (method !== 'GET' && !multipart) {
        let json = params;
        if (!(params instanceof Array)) {
            json = params ? {...params} : {};
            trimAllStrings(json)
        }
        options.body = JSON.stringify(json)
    } else if (method !== 'GET' && multipart) {
        options.body = params
    }

    return interceptedFetch(dispatch, uri, options)
        .then((resp) => {
            if (resp.status === 204) {
                return Promise.resolve()
            } else if (resp.ok) {
                return resp.json().catch(() => ({}));
            } else {
                return resp.text().then(body => {
                    throw {
                        status: resp.status,
                        statusText: resp.statusText,
                        body
                    }
                })
            }
        })
};

const get = (dispatch, uri, params, headers) => {
    return request(dispatch, 'GET', uri, params, headers)
};

const post = (dispatch, uri, payload, headers) => {
    return request(dispatch, 'POST', uri, payload, headers)
};

const put = (dispatch, uri, payload, headers) => {
    return request(dispatch, 'PUT', uri, payload, headers)
};

const patch = (dispatch, uri, payload, headers) => {
    return request(dispatch, 'PATCH', uri, payload, headers)
};

export default {
    get,
    post,
    put,
    patch
}
