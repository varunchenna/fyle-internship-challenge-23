import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { CLIENT_ID, CLIENT_SECRET } from '../credentials/GitHubCred';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
  }

  public getRepos(githubUsername: string){
    return this.httpClient.get<any[]>(`https://api.github.com/users/${githubUsername}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`)
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
