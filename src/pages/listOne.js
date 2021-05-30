import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Header from '../components/js/header'

function ListOne(props: PropsWithRef<any>) {

    const [post, setPost] = useState({})

    useEffect(() => {
        axios.get(`https://upload-my-api.herokuapp.com/post/${props.match.params.id}`)
        .then((response) => {
            setPost(response.data)
        })
    }, [])

    return(
        <div className="listOne">

            <header>
                <Header />
            </header>

            <main>
                <div className="cards">

                    <div className="card">

                        <header>
                            <h2>{post.title}</h2>
                        </header>

                        <div className="line" ></div>

                        <p className="conteudo"  >{post.content}</p>

                    </div>

                </div>
            </main>

        </div>
    )
}

export default ListOne;