import React, { useState, useEffect } from 'react'
import './feed.css'

import axios from 'axios'

import { Link } from 'react-router-dom'

import HeaderMain from '../components/js/headerMain.js'
import IconMore from './images/more.svg'

function Feed() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError ] = useState(false)

    useEffect(() => {
        axios.get("https://upload-my-api.herokuapp.com/post")
        .then((response) => {
            setPosts(response.data)
            setLoading(false)
        }).catch((err) => {
            setError(err.message)
            setLoading(false)
        })

    }, [])

    if(loading) {
        return (
            <div className="loading" >
                <div class="loadingio-spinner-reload-e92783bqdo5"><div class="ldio-969is40r22j">
                <div><div></div><div></div><div></div></div>
                </div></div>
            </div>
            
        )
    }

    const deletePost = (alertId) => {
        axios.delete(`https://upload-my-api.herokuapp.com/post/delete/${alertId}`)

        setPosts(posts.filter(post => post._id !== alertId ))
    }

    return(
        <div className="feed">
            <header>
                <HeaderMain />
            </header>
            
            <main>
                <div className="cards">

                    {posts.map((post, key) => {
                        return(
                            <div key={key} >
                                <div className="card">

                                <header>

                                    <h2> {post.title} </h2>

                                    <img src={IconMore} />

                                   
                                </header>

                                <div className="line" ></div>

                                <p>{post.description}</p>

                                <div className="btns" >

                                    <div className="btn-edit" >
                                        <Link to={{pathname: `/edit/${post._id}`}} >
                                            <button>Edit</button>
                                        </Link>
                                    </div>

                                    <div className="btn-readmore">
                                        <Link to={{pathname: `/ler/${post._id}`}} >
                                            <button>Ler mais</button>
                                        </Link>
                                    </div>

                                    <div className="btn-delete" >
                                        <button onClick={() => deletePost(post._id)} >Delete</button>
                                    </div>

                                </div>
                               

                                </div>

                                
                            </div>
                        )
                    })}

                </div>
            </main>

        </div> 
    )
}

export default Feed

