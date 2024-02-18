import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public githubUserQuery!: string;
  public githubprofile! : any;
  public githubrepos! : any;
  repos: any[] = [];
  reposPerPage: number = 6;
  public selectedPage = 1;
  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {

    let pageIndex = (this.selectedPage - 1)* this.reposPerPage;

    this.apiService.getUser('varunchenna').subscribe((data) => {
      this.githubprofile = data;
      console.log(data);
    }
      );

    this.apiService.getRepos('varunchenna').subscribe((data) => {
      this.githubrepos = data;
      console.log(this.githubrepos);
    }); 
    
    this.repos = this.githubrepos.slice(pageIndex,this.reposPerPage)
  }

  public searchUser(){
    this.apiService.getUser(this.githubUserQuery).subscribe((data) => {
      console.log(data);
      this.githubprofile = data;
    })

    this.apiService.getRepos(this.githubUserQuery).subscribe((data) => {
      this.repos = []; 
      this.changePage(1);
      this.githubrepos = data;
      console.log(this.githubrepos);
    });   
  }

  changePerSize(event: Event){
    const newSize = (event.target as HTMLInputElement).value
    this.reposPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageNumbers(): number[]{
    return Array(Math.ceil(this.githubrepos.length / this.reposPerPage)).fill(0).map((x,i) => i + 1);
  } 

  changePage(page: any){
    this.selectedPage = page;
    this.slicedRepos();
  }

  slicedRepos(){
    let pageIndex = (this.selectedPage - 1)* this.reposPerPage;
    let endIndex = (this.selectedPage - 1)*this.reposPerPage + this.reposPerPage;
    this.repos = [];
    this.repos = this.githubrepos.slice(pageIndex, endIndex);
  }
  
}
