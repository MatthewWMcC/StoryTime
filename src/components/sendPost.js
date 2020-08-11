import axios from 'axios'

export function sendPost(post) {
    post.rgb = {
        r: Math.random() * 155 + 100,
        g: Math.random() * 155 + 100,
        b: Math.random() * 155 + 100
    }
    axios.post('http://storytime-matt.herokuapp.com/home/public', post)
        .then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        });
}