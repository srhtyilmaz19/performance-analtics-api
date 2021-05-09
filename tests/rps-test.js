import http from 'k6/http';
import {check, sleep} from 'k6';

export default function () {
    const url = 'http://127.0.0.1:5555/api/v1/metrics';
    const payload = JSON.stringify({
        domain: 'localhost',
    });
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let res = http.post(url, payload, params);
    check(res, {'status was 200': (r) => r.status === 200});
    sleep(1);
}
