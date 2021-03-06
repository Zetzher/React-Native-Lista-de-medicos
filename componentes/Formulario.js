import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';


const Formulario = ({citas, setCitas, guardarMostrarForm, guardarCitasStorage}) => {

    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono, guardarTelefono] = useState('');

    const [sintomas, guardarSintomas] = useState('');
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const confirmarFecha = (date) => {
        const opciones = { year: 'numeric', month: 'long', day: '2-digit'}
        guardarFecha(date.toLocaleDateString('es-ES', opciones));
      hideDatePicker();
    };


    //Muestra time picker

    const showTimePicker = () => {
        setTimePickerVisibility(true);
      };
    
      const hideTimePicker = () => {
        setTimePickerVisibility(false);
      };

      const confirmarHora = (hora) =>  {
          const opciones = { hour: 'numeric', minute: "2-digit", hour12: false}
          guardarHora(hora.toLocaleString('es-ES', opciones));
          hideTimePicker();
      };


      //Crear nueva cita

      const crearNuevaCita = () => {
          if(paciente.trim() === '' || propietario.trim() === '' || telefono.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
              mostrarAlerta()
              return;
          }
      }

      //Crear cita
      const cita = { paciente, propietario, telefono, fecha, hora, sintomas }
      cita.id = shortid.generate();

   // Agregar al state
   const citasNuevo = [...citas, cita];
   setCitas(citasNuevo);


   guardarCitasStorage(JSON.stringify)


   guardarMostrarForm(false)

      

      //Resetear formulario


      //Muestra alerta si falla validación

      const mostrarAlerta = () => {
          Alert.alert(
              'Error', //Título
              'Todos los campos son obligatorios', //Mensaje
              [{
                  text: 'De acuerdo'
              }]
          )
      }

    
return (
<TouchableWithoutFeedback>
    <View style={styles.formulario}>
   
        <View>
            <Text style={styles.label}>Paciente:</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={ texto => guardarPaciente(texto) }
            />
        </View>

        <View>
            <Text style={styles.label}>Dueño:</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={ texto => guardarPropietario(texto) }
            />
        </View>

        <View>
            <Text style={styles.label}>Telefono de contacto:</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={ texto => guardarTelefono(texto) }
                keyboardType='numeric'
            />
        </View>

        <View>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.label}>{fecha}</Text>
      <Button title="Selecciona la fecha" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={confirmarFecha}
        onCancel={hideDatePicker}
        locale='es_ES'
        //headerTextIOS="Elige una hora" -> Texto de header
        //confirmTextIOS="Confirmar" -> Cambiar texto para confirmar
      />
      </View>
    <View>
    <Text style={styles.label}>Hora</Text>
    <Text style={styles.label}>{hora}</Text>
      <Button title="Selecciona la hora" onPress={showTimePicker}
  />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={confirmarHora}
        onCancel={hideTimePicker}
        locale='es_ES'
        is24Hour
      />
    </View>

        <View>
            <Text style={styles.label}>Síntomas:</Text>
            <TextInput 
                multiline
                style={styles.input} 
                onChangeText={ (texto) => guardarSintomas(texto) }
            />
        </View>

        <View>
                <TouchableHighlight onPress={ () => crearNuevaCita() } style={styles.btnSubmit}>
                    <Text style={styles.textoSubmit}> Crear nueva cita </Text>
                </TouchableHighlight>
            </View>
        
    </View>
</TouchableWithoutFeedback>

)

}



const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: '2.5%'
    },
label: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 18
},
input: {
marginTop: 10,
height: 50,
borderColor: '#e1e1e1',
borderWidth: 1,
borderStyle: 'solid'
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

export default Formulario;