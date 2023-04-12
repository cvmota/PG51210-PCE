import ListSensors from "./ListSensors";
import NewSensor from "./NewSensor"

export default function IndexSensors() {
    return (
        <div>
            <h1>Listagem Geral de Sensores</h1>
            <div style={{padding: '20px'}}>
                <ListSensors/>
            </div>
            <div style={{padding: '10px'}}>
                <NewSensor/>
            </div>
        </div>
    );
}