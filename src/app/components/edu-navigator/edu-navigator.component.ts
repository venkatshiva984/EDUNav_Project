import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { EduNavigatorService } from '../../services/edu-navigator.service';

@Component({
  selector: 'app-edu-navigator',
  templateUrl: './edu-navigator.component.html',
  styleUrls: ['./edu-navigator.component.scss'],
})
export class EduNavigatorComponent {
  name:any = '';
  prompt: string = '';
  gridData:any[] = [];
  headers:any;
  responseMessage?: string;
  isRefreshed: boolean = false;
  request: string = '';
  typeMessage: string = "View in Chart"
  isLoading: boolean = false;

  messages: string[] = [
    "Can you suggest top colleges",
    "Recommend the colleges near Tirupati for the rank 35000",
    "Can you suggest top colleges with Mechanical branch",
    "Can you suggest colleges with good Placements Percentage",
    "Can you suggest colleges with nice infrastructure",
    "Can you suggest top colleges with Civil branch in Chennai",
    "Can you suggest colleges with top Ratings",
    "Find colleges with high ratings and good infrastructure",
    "Top colleges with best infrastructure and placements in Hyderabad",
    "Top 10 colleges with best placements and ratings",
    "Recommend the colleges near Nellore",
    "Recommend the colleges near Hyderabad"
  ];
  displayedMessages: string[] = [];

  constructor(private router: Router, private eduNavService: EduNavigatorService) {}

  ngOnInit(){
    if(typeof localStorage !== 'undefined' && localStorage && window.localStorage){
      this.name = localStorage.getItem('name');
    }
    this.updateDisplayedMessages();
  }

  // Function to shuffle and pick three random messages
  updateDisplayedMessages(): void {
    const shuffled = [...this.messages].sort(() => 0.5 - Math.random());
    this.displayedMessages = shuffled.slice(0, 3);
  }

  // Function to set the selected message
  onMessageClick(message: string): void {
    this.prompt = message;
    this.search();
  }

  search(event?: Event): void {
    if(this.prompt){
      const keyboardEvent = event as KeyboardEvent; // Cast Event to KeyboardEvent
      if (keyboardEvent) {
        keyboardEvent.preventDefault(); // Prevent adding a new line in the textarea
      }
      const prompt = this.request = this.prompt;
      this.isLoading = true;
      this.prompt = '';
      this.isRefreshed = false;
      this.eduNavService.getRecommendations(prompt).subscribe(
        (res) => {
          this.bindData(res);
          this.isRefreshed = true;
          this.isLoading = false;
        },
        (errorRes) => {
          this.responseMessage = errorRes.error?.message ? errorRes.error?.message : errorRes.error.error;
          console.error(errorRes);
          this.isLoading = false;
        }
      );
    }
  }

  bindData(res:any){
    this.responseMessage = res.message;
    this.gridData = res.recommendation;
    this.gridData.forEach(element => {
      this.headers = Object.keys(element)
    });
  }

  downloadExcel(event:any, gridData:any, headers: any) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(gridData, headers);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'data');

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, 'grid');
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString().replace(/[/]/g, '-') + " " + currentDate.toLocaleTimeString().replace(/[:]/g, '_');
    const dynamicFileName = `${fileName} ${formattedDate}.xlsx`;

    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, dynamicFileName);  // Save the file with the new filename
  }

  redirect(){
    this.router.navigate(['/edu-navigator']);
  }

}
