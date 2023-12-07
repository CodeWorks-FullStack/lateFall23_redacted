import { AppState } from "../AppState.js";
import { generateId } from "../utils/GenerateId.js";


/**
 *  @typedef caseFileData
 * @property {string} agency
 * @property {string} body
 * @property {string} reportedDate 
 * @property {string} caseNumber 
*/
export class CaseFile{
  /** @param {caseFileData} data */
  constructor(data){
    this.id = generateId()
    this.caseNumber = data.caseNumber || this.id.slice(this.id.length-6) // case numbers are just the end of the id
    this.agency = data.agency
    this.body = data.body || ''
    this.reportedDate = new Date(data.reportedDate)
    this.locked = true
    // when this was last opened?
    console.log('new 📁', this);
  }

  get caseFileListItem(){
    return `
<div class="text-light d-flex justify-content-between">
  <span>
    ${this.agency} - <span class="text-uppercase">${this.caseNumber}</span>
  </span>
  <span>${this.ShortDate}</span>
  <span>
    <button onclick="app.CaseFilesController.openCaseFile('${this.id}')" class="btn btn-outline-light" title="open case"><i class="mdi mdi-folder-open"></i></button>
  </span>
</div>`

  }

  get ActiveCaseFileTemplate(){
    // return `ACTIVE ${this.caseNumber}`
    return `
<div class="col-12">
  <h1 class="text-uppercase fw-bold">${this.agency} ${this.caseNumber}</h1>
  <p>${this.LongDate}</p>
  ${this.locked ? this.EditButton : this.SaveButton}
</div>
<div class="col-8 p-2 bg-white shadow border border-dark">
  ${this.locked ? this.LockedCaseFileBody : this.EditableCaseFileBody}
</div>
`
  }

  get LockedCaseFileBody(){
    return `
    <p rows="20" class="w-100">
     ${this.RedactedBody}
   </p>
    `
  }

  get EditableCaseFileBody(){
    return `
<textarea rows="20" class="w-100" id="active-case-body" maxlength=2000>${this.body}</textarea>
    `
  }

  get EditButton(){
    return `<button onclick="app.CaseFilesController.unlockCaseFile()" class="btn btn-info">edit case<i class="mdi mdi-pen"></i></button>`
  }

  get SaveButton(){
    return `<button onclick="app.CaseFilesController.lockCaseFile()" class="btn btn-warning">save case<i class="mdi mdi-content-save"></i></button>`
  }

  get LongDate(){
    return this.reportedDate.toLocaleDateString('en-US', {month: 'long', weekday: 'long', day: 'numeric', year: 'numeric'})
  }

  get ShortDate(){
    return this.reportedDate.toLocaleDateString()
  }

  get RedactedBody(){
    let bodyArr = this.body.split(' ')
    let redactedArr = bodyArr.map(word => {
      let isRedacted = AppState.redactedWordList.includes(word.toLowerCase())
      return isRedacted ? '⬛⬛⬛⬛⬛' : word
    })
    return redactedArr.join(' ')
  }
}