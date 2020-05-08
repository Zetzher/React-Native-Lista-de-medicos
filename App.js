/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList, ScrollView, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';


const App = () => {
const [mostrarForm, guardarMostrarForm] = useState(false)

// definir state de citas
const[citas, setCitas] = useState([
  { id: "1", paciente: "Hook", propietario: 'Juan', sintomas: "No Come"},
  { id: "2", paciente: "Redux", propietario: 'Itzel', sintomas: "No Duerme"},
  { id: "3", paciente: "Native", propietario: 'Josue', sintomas: "No Canta"},
]);

//Elimina pacientes del state

const eliminarPaciente = id => {
  setCitas( (citasActuales) => {
        return citasActuales.filter( cita => cita.id !== id)
  })
}

  //Mostrar formulario

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm)
}

const cerrarTeclado = () => {
  Keyboard.dismiss();
}

  return (

    <TouchableWithoutFeedback>
    <ScrollView style={styles.contenedor}>
    <View>
    <TouchableHighlight onPress={ () => mostrarFormulario() } style={styles.btnSubmit}>
        <Text style={styles.textoSubmit}> Crear nueva cita </Text>
    </TouchableHighlight>
</View>
     
     <View style={styles.contenido}>
     
    { mostrarForm ? (
      <View>
      <Text style={styles.titulo}>Administrador de Citas</Text>
      <Formulario 
        citas={citas}
        setCitas={setCitas}
        guardarMostrarForm={guardarMostrarForm}
      />
      </View>
    ) : (<>
      <Text style={styles.titulo}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una'}</Text>

<FlatList
style={styles.listado}
data={citas}
renderItem={ ({item}) => <Cita item={item} eliminarPaciente={eliminarPaciente} />}
keyExtractor={ cita => cita.id}
/>
</>
)
    }
    </View>

    </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
  backgroundColor: '#AA076B',
  flex: 1
  },
  titulo: {
    color: '#FFF',
    marginTop: 40,
    fontSize: 24,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%'
  },
  listado: {
    flex: 1
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10
},
textoSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
}
})

export default App;
