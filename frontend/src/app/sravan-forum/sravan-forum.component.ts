import { Component, OnInit } from '@angular/core';

export interface Forumdata {
  title: string;
  replies: number;
  author: string;
  time: string;
}

@Component({
  selector: 'app-sravan-forum',
  templateUrl: './sravan-forum.component.html',
  styleUrls: ['./sravan-forum.component.scss']
})
export class SravanForumComponent  {

  Forum_data_collection : Forumdata[] = [
    {title: 'Example post title', author: 'sravan1',replies : 200, time:' 26 may 2019 11:15'},
    {title: 'Example post title1', author: 'sravan2',replies : 200, time:' 26 may 2019 11:15'},
  ]


}
