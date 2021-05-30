import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import '../pages/post.css' 
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios'

import { useHistory } from 'react-router-dom'

import Header from '../components/js/header'



function Edit(props: PropsWithRef<any>) {

    const schema = yup.object().shape({
        title: yup.string().max(40, 'O título deve ter menos que 40 caracteres').required('O título precisa ser preenchido'),
        description: yup.string().max(100, 'A descrição deve ter menos que 100 caracteres').required('A descrição precisa ser preenchida'),
        content: yup.string().required('O campo conteúdo precisa ser preenchido')
    })

    let history = useHistory()

    const [list, setList ] = useState({})

    const preoladedValues = {
        title: list.title,
        description: list.description,
        content: list.content
    }

    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValue: preoladedValues
    })

    useEffect(() => {
        axios.get(`https://upload-my-api.herokuapp.com/post/${props.match.params.id}`)
        .then((response) => {
            reset(response.data)
        })
        
    }, [])

    const onSubmit = update => axios.put(`https://upload-my-api.herokuapp.com/post/edit/${props.match.params.id}`, {
        title: update.title,
        description: update.description,
        content: update.content
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
                    <h1>Editar Postagem</h1>
                    <div className="line-post"></div>

                    <div className="card-body-post">
                        
                        <form onSubmit={handleSubmit(onSubmit)} >

                            <div className="fields">
                                <label>Título</label>
                                <input  type="text" name="title" autoComplete="off" {...register("title")} />
                                <p className="error-message" >{errors.title?.message}</p>
                            </div>
                            
                            <div className="fields" >
                                <label>Descrição</label>
                                <input  type="text" name="description" autoComplete="off" {...register("description")} />
                                <p className="error-message" >{errors.description?.message}</p>
                            </div>

                            <div>
                                <label>Conteúdo</label>
                                <textarea name="content"  {...register("content")} ></textarea>
                                <p className="error-message" >{errors.content?.message}</p>
                            </div>

                            <div className="btn-post">                               
                                <button type="submit">Editar</button>                           
                            </div>
                                            
                        </form>

                    </div>

                </div>

            </main>

        </div>
    )
}

export default Edit