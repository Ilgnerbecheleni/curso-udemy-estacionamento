import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import { toast } from 'react-toastify';

const Definicoes = () => {

    const [preco, setPreco] = useState()
    const [precoNovo, setPrecoNovo] = useState();

    const notifySucces = () => {
        toast.success("Definições Atualizadas", {
            position: "top-left"
        });
    }

    const notifyError = () => {
        toast.error("Falha ao alterar", {
            position: "top-left"
        });
    }


    async function lerdados() {
        try {
            let { data: definicoes, error } = await supabase
                .from('definicoes')
                .select('*')
            if (error) {
                console.error(error)
                notifyError();
            }
            console.table(definicoes[0].preco);

            setPreco(definicoes[0].preco);


        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        lerdados();
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()

        try {

            const preco = parseFloat(precoNovo)

            const { error } = await supabase
                .from('definicoes')
                .update({ preco: preco })
                .eq('id', 1)


            if (error) {
                console.error(error)
            }
            e.target.reset()
            lerdados();
            notifySucces();


        } catch (error) {
            console.error(error)
        }
    }



    return (
        <main className="container">
            <div className='m-5 d-flex justify-content-around'>
                <h1>Definições</h1>
                <button className="btn btn-secondary"><Link to='/' className='btn'>Estacionamento</Link></button>
            </div>
            <section>
                <h2>Preço atual por hora : R$ {preco}</h2>
            </section>
            <section>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-5">
                        <label className="form-label">Definir novo preço</label>
                        <input type="number" className="form-control" onChange={(e) => { setPrecoNovo(e.target.value) }} />
                    </div>
                    <button type="submit" className="btn btn-primary">Definir</button>
                </form>
            </section>

        </main>
    )
}


export default Definicoes;