import {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Send from '../assets/images/Send';
import {theme} from '../config/theme';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const sendMessage = useCallback(() => {
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: input,
        sender: 'user',
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput('');
    }
  }, [input]);

  const receiveMessage = useCallback((text: string) => {
    const botMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'bot',
    };
    setMessages(prevMessages => [...prevMessages, botMessage]);
  }, []);

  useEffect(() => {
    if (messages.length && messages[messages.length - 1].sender === 'user') {
      setTimeout(() => receiveMessage('This is a bot reply!'), 1000);
    }
  }, [messages, receiveMessage]);

  const renderItem = ({item}: {item: Message}) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.botMessage,
      ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : 0}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder=""
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Send style={styles.sondButtonIcon} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.primary,
  },
  messageList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: theme.blue,
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: theme.gray3,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: theme.white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: theme.gray3,
    position: 'relative',
  },
  input: {
    flex: 1,
    backgroundColor: theme.white,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: theme.yellow,
    width: 30,
    height: 30,
    borderRadius: 20,
    position: 'absolute',
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sondButtonIcon: {
    alignSelf: 'center',
  },
});
