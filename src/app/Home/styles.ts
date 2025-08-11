import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#d0d2d8',
    paddingTop: 62,
  },
  logo: {
    height: 34,
    width: 134
  },
  form: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 8,
    marginTop: 42
  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 32,
    marginTop: 24
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    width: '100%',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e6ec'
  },
  clearButton: {
    marginLeft: 'auto'
  },
  clearText: {
    fontSize: 12,
    fontWeight: 600,
    color: '#828282'
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#eef0f5',
    marginVertical: 16
  },
  listContent: {
    paddingTop: 24,
    paddingBottom:62
  },
  empty: {
    fontSize: 14,
    color: '#808080',
    textAlign: 'center'
  }
})