import 'react-native'

// libraries to mock
import './mock-safe-area-context'
import './mock-react-native-encrypted-storage'

jest.useFakeTimers()
declare global {
  // eslint-disable-next-line no-underscore-dangle
  let __TEST__
}