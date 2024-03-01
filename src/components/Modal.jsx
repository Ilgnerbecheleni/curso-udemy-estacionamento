
const ModalFechamento = ({ isOpen, fecharModal, fecharEstacionamento, item }) => {
    return (
      <div className={`modal fade ${isOpen ? 'show' : ''}`} id="fecharModal" tabIndex="-1" role="dialog" aria-labelledby="fecharModalLabel" aria-hidden={!isOpen}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="fecharModalLabel">Fechar Estacionamento</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Fechar" onClick={fecharModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Confirma o fechamento do estacionamento para a placa {item.placa}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={fecharModal}>
                Cancelar
              </button>
              <button type="button" className="btn btn-primary" onClick={() => fecharEstacionamento(item)}>
                Confirmar Fechamento
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ModalFechamento;