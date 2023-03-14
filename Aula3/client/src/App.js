import React from 'react';
import './App.css';

function App() {
    return (
        <div className="container-fluid my-4">
            <h1 className="text-center">Marcação de consulta de anestesia</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form className="form-control bg-light p-4">
                        <div className="form-group my-2">
                            <label htmlFor="name">Nome</label><span className="text-danger">*</span>
                            <input type="text" className="form-control" id="schedule-name" required/>
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="patientID">Número de utente</label><span className="text-danger">*</span>
                            <input type="text" className="form-control" id="schedule-patientID" pattern="[0-9]{9}"
                                   maxLength="9" required/>
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="email">Email</label><span className="text-danger">*</span>
                            <input type="email" className="form-control" id="schedule-email" required/>
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="phone">Telefone</label><span className="text-danger">*</span>
                            <input type="tel" className="form-control" id="schedule-phone" required/>
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="date">Data</label><span className="text-danger">*</span>
                            <input type="date" className="form-control" id="schedule-date" required/>
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="time">Hora</label><span className="text-danger">*</span>
                            <input type="time" className="form-control" id="schedule-time" required/>
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="obs">Observações</label>
                            <textarea className="form-control" id="schedule-obs" rows="3"/>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Marcar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
