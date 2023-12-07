import { generateId } from "../utils/GenerateId.js";


/**
 *  @typedef caseFileData
 * @property {string} agency
 * @property {string} body
 * @property {string} reportedDate 
*/
export class CaseFile{
  /** @param {caseFileData} data */
  constructor(data){
    this.id = generateId()
    this.caseNumber = this.id.slice(this.id.length-6) // case numbers are just the end of the id
    this.agency = data.agency
    this.body = data.body || ''
    debugger
    this.reportedDate = new Date(data.reportedDate)
    // when this was last opened?
    console.log('new 📁', this);
  }

  get caseFileListItem(){
    return `<p>${this.agency} - ${this.caseNumber}</p>`
  }
}