// Atividade 4: useEffect
// Botão liga/desliga para testar montagem e desmontagem do sensor

import { useState } from "react";
import { Button } from "react-native";
import ScreenWrapperFullscreen from "./src/components/screen-wrappers/ScreenWrapperFullscreen";
import ParkingSensor from "./src/components/ParkingSensor";

export default function App() {
  // Estado que controla se o sensor está visível (montado) ou não
  const [sensorOn, setSensorOn] = useState<boolean>(false);

  return (
    <ScreenWrapperFullscreen center gap={20}>
      {/* Botão que alterna entre ligar e desligar o sensor */}
      <Button
        title={sensorOn ? "Desligar Sensor" : "Ligar Sensor"}
        onPress={() => setSensorOn(!sensorOn)}
      />

      {/* Renderização condicional: monta/desmonta o componente ParkingSensor */}
      {sensorOn && <ParkingSensor />}
    </ScreenWrapperFullscreen>
  );
}
