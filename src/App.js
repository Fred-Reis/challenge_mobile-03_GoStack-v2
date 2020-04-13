import React, {useEffect, useState} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api'

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  },[])

  async function handleLikeRepository(id) {
    await api.post(`repositories/${id}/like`)

    setRepositories(
      repositories.map(repo => ( repo.id === id ? { ...repo , likes: repo.likes + 1} : repo))
    )
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        
        <FlatList
           data={repositories}
           keyExtractor={repository => repository.id}
           renderItem={({ item }) => (
            <View key={item.id} style={styles.repositoryContainer}>
              <Text style={styles.repository}>{item.title}</Text>
                <View style={styles.techsContainer}>
                  {item.techs.map((tech, id) => (
                    <Text key={id} style={styles.tech}>
                      {tech}
                    </Text>
                  ))}
                </View>
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${item.id}`}
                >
                  {item.likes} curtidas
                </Text>
              </View>
  
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(item.id)}
                testID={`like-button-${item.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
  
           )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius:12
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    borderRadius: 14,
    backgroundColor: "#7159c1",
    padding: 15,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign:'center',
  },
});
