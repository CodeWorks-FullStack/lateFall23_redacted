import { CaseFile } from './models/CaseFile.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  /**@type {import('./models/Example.js').Example[]} */
  examples = []


  caseFiles = [
    new CaseFile({
      agency: '👽',
      body: 'Early one morning before the start of codeworks immersive late fall class. A large metal cube could be seen floating above the department building across the street.',
      reportedDate: '12/7/2023'
    }),
    new CaseFile({
      agency: '🦄',
      body: 'Late in the day just one week ago, student Heather witnessed a sauropod like creature in a canal.',
      reportedDate: '11-28-2023'
    })
  ]
}

export const AppState = createObservableProxy(new ObservableAppState())