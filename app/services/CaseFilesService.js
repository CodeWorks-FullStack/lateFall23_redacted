import { AppState } from "../AppState.js";
import { CaseFile } from "../models/CaseFile.js"
import { loadState, saveState } from "../utils/Store.js";





class CaseFilesService{
  createCaseFile(formData){
    const newCaseFile = new CaseFile(formData)
    console.log('✨📁', newCaseFile);
    AppState.caseFiles.push(newCaseFile)
    this.saveCaseFiles()
  }

  saveCaseFiles(){
    saveState('caseFiles', AppState.caseFiles) // takes a key, and save the data under that key
  }

  loadCaseFiles(){
    const coldCaseFiles = loadState('caseFiles', [CaseFile]) // loading takes a key the data was saved under, and the TYPE the data should be returned as. In this case it returns the loaded 'caseFiles' as an Array with CaseFiles inside
    AppState.caseFiles = coldCaseFiles
  }
}

export const caseFilesService = new CaseFilesService()