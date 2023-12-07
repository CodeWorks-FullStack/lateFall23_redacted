import { AppState } from "../AppState.js";
import { caseFilesService } from "../services/CaseFilesService.js";
import { getFormData } from "../utils/FormHandler.js";

// Private function. underscore before the function name tells developers this is outside the exported scope and is private
function _drawCaseFilesList(){
  const caseFiles = AppState.caseFiles
  let content = ''
  caseFiles.forEach(caseFile => content += caseFile.caseFileListItem)
  document.getElementById('case-file-list').innerHTML = content
}

function _drawActiveCaseFile(){
  const activeCaseFile = AppState.activeCaseFile
  let content = activeCaseFile.ActiveCaseFileTemplate
  document.getElementById('active-case-file').innerHTML = content
}

export class CaseFilesController{
  constructor(){
    console.log('🗄️ ready to report some happenings');
    AppState.on('activeCaseFile', _drawActiveCaseFile)
    AppState.on('caseFiles', _drawCaseFilesList) // attach observer first
    caseFilesService.loadCaseFiles() // load data, loading changes the state which triggers our observer
    // _drawCaseFilesList()
  }


  createCaseFile(){
    event.preventDefault()
    const form = event.target
    const formData = getFormData(form)
    // REVIEW dates constructor is weird and doesn't like -, just want's /
    formData.reportedDate = formData.reportedDate.replaceAll('-', '/')
    console.log('➕📁', formData);
    caseFilesService.createCaseFile(formData)
    // @ts-ignore
    form.reset()
  }

  openCaseFile(caseFileId){
    console.log('🗃️', caseFileId);
    caseFilesService.openCaseFile(caseFileId)
  }

  unlockCaseFile(){
    console.log('🔓');
    caseFilesService.unlockCaseFile()
    // _drawActiveCaseFile() this will also work if you don't want to force the observer from the service layer
  }

  lockCaseFile(){ // and this locks it too
    console.log('💾🔒');
    const newBody = document.getElementById('active-case-body').value // grabs the text content out of our area
    console.log('new stuff', newBody);
    caseFilesService.lockCaseFile(newBody)
  }
}