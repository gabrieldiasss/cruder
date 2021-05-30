import React from 'react'
import { useForm } from 'react-hook-form'
import '../pages/post.css' 
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios'

import { useHistory } from 'react-router-dom'

import Header from '../components/js/header'

const schema = yup.object().shape({
    title: yup.string().required('O título precisa ser preenchido').max(40, 'O título deve ter menos que 40 caracteres'),
    description: yup.string().required('A descrição precisa ser preenchida').max(100, 'A descrição deve ter menos que 100 caracteres'),
    content: yup.string().required('O campo conteúdo precisa ser preenchido')
})

function Post() {

    let history = useHistory()

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => axios.post("https://upload-my-api.herokuapp.com/post/create", {
        title: data.title,
        description: data.description,
        content: data.content
    }).then((response) => {
        history.push("/")
    })

    return(
        <div className="Post">
            <header>
                <Header />
            </header>
            
            <main>
                
                <div className="card-post">
                    <h1>Criar Postagem</h1>
                    <div className="line-post"></div>

                    <div className="card-body-post">
                        
                        <form onSubmit={handleSubmit(onSubmit)} >

                            <div className="fields">
                                <label>Título</label>
                                <input type="text" name="title" autoComplete="off" {...register("title")} />
                                <p className="error-message" >{errors.title?.message}</p>
                            </div>
                            
                            <div className="fields" >
                                <label>Descrição</label>
                                <input  type="text" name="description" autoComplete="off" {...register("description")} />
                                <p className="error-message" >{errors.description?.message}</p>
                            </div>

                            <div>
                                <label>Conteúdo</label>
                                <textarea type="text" name="content" {...register("content")} ></textarea>
                                <p className="error-message" >{errors.content?.message}</p>
                            </div>

                            <div className="btn-post">                               
                                <button type="submit" >Enviar</button>                           
                            </div>
                                            
                        </form>

                    </div>

                </div>

            </main>

        </div>
    )
}

export default Post