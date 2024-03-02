import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Estacionamento = () => {

    const [placa, setPlaca] = useState('');
    const [estacionamento, setEstacionamento] = useState([]);
const [valorHora , setValorHora]= useState();

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

    async function lervalor() {
        try {
            let { data: estacionamento, error } = await supabase
                .from('definicoes')
                .select('*')
            if (error) {
                console.error(error)
            }
            console.table(estacionamento[0].preco);
            setValorHora(estacionamento[0].preco);


        } catch (error) {
            console.log(error)
        }

    }



    useEffect(() => {
        lerdados();
        lervalor();
    }, [])


    async function handleSubmit(e) {
        e.preventDefault()
        const dado = placa;
        const entrada = new Date();

        const offsetMinutos = entrada.getTimezoneOffset();

        const entradaUTC = new Date(entrada.getTime() - offsetMinutos * 60000);

       const entradaConvertida = entradaUTC.toISOString();
       
        try {
            const { data, error } = await supabase
                .from('estacionamento')
                .insert([
                    { placa: dado, entrada : entradaConvertida },
                ])
                .select()
            if (error) {
                notifyError();
                return
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
        
        const dataFormatada = new Date(timestamp).toLocaleDateString('pt-br', options);
        // const dataFormatada = new Intl.DateTimeFormat('pt-br', options).format(new Date(timestamp));

        return dataFormatada;
    }

     async function fecharHoraeValor(id,entrada) {
     const horaInicial = new Date(entrada);
     const final = new Date();

     const diferencaMilisegundos = final - horaInicial ;

     const diferencaEmHoras = Math.floor(diferencaMilisegundos/(1000*60*60));

     const valorTotal = diferencaEmHoras*valorHora ;

     console.log("total a pagar R$ "+ valorTotal)
        
     try {


        let preco = parseFloat(valorTotal)
        if(preco===0){
            preco = parseFloat(valorHora/2) ;
        }
        const saida = new Date();

        const offsetMinutos = saida.getTimezoneOffset();

        const saidaUTC = new Date(saida.getTime() - offsetMinutos * 60000);
        console.log(id)
       const saidaConvertida = saidaUTC.toISOString();
       const { data, error } = await supabase
       .from('estacionamento')
       .update({ valor: preco , saida: saidaConvertida })
       .eq('id', id)
       .select()

        if (error) {
            console.error(error)
            notifyError();
            return
        }
        lerdados();
        notifySucces();


    } catch (error) {
        console.error(error)
    }


    }




    return (
        <>
            <main className='container'>
                <div className='m-5 d-flex justify-content-around'>
                    <h1>Estacionamento</h1>
                    <button className="btn btn-light"><Link to='/definicoes' className='btn'>Definicoes</Link></button>
                    <h4>Valor Hora: R${valorHora}</h4>
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
                                            <td>{item.saida ? formatData(item.saida) : null}</td>
                                            <td>{item.valor}</td>
                                            <td>
                                               {
                                                item.saida!=null?<p>Fechado</p>: <button className="btn btn-primary" onClick={()=>{
                                                    fecharHoraeValor(item.id,item.entrada)
                                                }}>
                                                    Fechar
                                                </button>
                                               }
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