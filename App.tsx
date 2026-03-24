import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useState } from 'react';

export default function Calculadora() {
  const [primeiro, setPrimeiro] = useState('');
  const [segundo, setSegundo] = useState('');
  const [resultado, setResultado] = useState<number | null>(null);
  const [erro, setErro] = useState('');

  const somar = () => {
    Keyboard.dismiss();
    
    const n1 = parseFloat(primeiro.replace(',', '.')) || 0;
    const n2 = parseFloat(segundo.replace(',', '.')) || 0;

    if (primeiro === '' || segundo === '') {
      setResultado(null);
      setErro('Preencha os dois campos');
      return;
    }

    if (isNaN(n1) || isNaN(n2)) {
      setResultado(null);
      setErro('Digite números válidos');
      return;
    }

    const soma = n1 + n2;
    setResultado(soma);
    setErro('');
  };

  const limpar = () => {
    setPrimeiro('');
    setSegundo('');
    setResultado(null);
    setErro('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <Text style={styles.titulo}>Somar dois números</Text>

      <View style={styles.campo}>
        <Text style={styles.label}>Primeiro número</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 10,5"
          keyboardType="decimal-pad"
          value={primeiro}
          onChangeText={setPrimeiro}
        />
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>Segundo número</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 7"
          keyboardType="decimal-pad"
          value={segundo}
          onChangeText={setSegundo}
        />
      </View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botaoSomar} onPress={somar}>
          <Text style={styles.botaoTexto}>Somar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.botaoLimpar} onPress={limpar}>
          <Text style={styles.botaoTexto}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <View style={styles.resultadoArea}>
        <Text style={styles.resultadoTitulo}>Resultado:</Text>
        <Text style={styles.resultadoValor}>
          {resultado !== null ? resultado.toFixed(2).replace('.', ',') : '—'}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8c41c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  campo: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#03f8aa',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  botoesContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    width: '100%',
  },
  botaoSomar: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoLimpar: {
    flex: 1,
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultadoArea: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '100%',
  },
  resultadoTitulo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  resultadoValor: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  erro: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
  },
});