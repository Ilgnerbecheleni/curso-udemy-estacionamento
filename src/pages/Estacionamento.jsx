import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Estacionamento = () => {

    const [placa, setPlaca] = useState('');
    const [estacionamento, setEstacionamento] = useState([]);


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
            let { data: estacionamento, error } = await supabase
                .from('estacionamento')
                .select('*')
            if (error) {
                console.error(error)
            }
            console.table(estacionamento);
            setEstacionamento(estacionamento);


        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        lerdados();
    }, [])


    async function handleSubmit(e) {
        e.preventDefault()
        const dado = placa;
        try {
            const { data, error } = await supabase
                .from('estacionamento')
                .insert([
                    { placa: dado },
                ])
                .select()
            if (error) {
                notifyError();
            }
            lerdados();
            setPlaca('');
            e.target.reset();
            notifySucces();


        } catch (error) {
            console.error(error)
            notifyError();
        }
    }

    function formatData(timestamp) {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        }
        const dataFormatada = new Intl.DateTimeFormat('pt-br', options).format(new Date(timestamp));

        return dataFormatada;
    }

 


    return (
        <>
            <main className='container'>
                <div className='m-5 d-flex justify-content-around'>
                    <h1>Estacionamento</h1>
                    <button className="btn btn-light"><Link to='/definicoes' className='btn'>Definicoes</Link></button>
                </div>
                <section className='m-3'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Placa do veículo</label>
                            <input type="text" className="form-control" onChange={(e) => { setPlaca(e.target.value) }} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Registrar</button>
                    </form>
                </section>
                <section>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Placa</th>
                                <th scope="col">Entrada</th>
                                <th scope="col">Saida</th>
                                <th scope="col">Valor</th>
                                <th scope="col">Fechar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                estacionamento.map((item, index) => {
                                    return (
                                        <tr key={index} >
                                            <td>{index + 1}</td>
                                            <td>{item.placa}</td>
                                            <td>{formatData(item.entrada)}</td>
                                            <td>{item.saida?formatData(item.saida):null}</td>
                                            <td>{item.valor}</td>
                                            <td>
                    <button className="btn btn-primary" onClick={() => console.log(item)}>
                      Fechar
                    </button>
                  </td>
                                        </tr>
                                    )
                                })


                            }

                        </tbody>
                    </table>
                </section>
              
     
            </main>

        </>
    )
}


export default Estacionamento;