import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-kiss',
  templateUrl: './kiss.component.html',
  styleUrls: ['./kiss.component.scss']
})
export class KissComponent implements OnInit {
  loggedInUser: string | null = null;
  title = "";
  kissCount: number = 0;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.loggedInUser = localStorage.getItem('loggedInUser');
    this.title = this.loggedInUser![0].toUpperCase()+this.loggedInUser!.slice(1);

    if (this.loggedInUser) {
      this.fetchKissCount();
    }

      // this.supabaseService.getUsers().then((data)=>{
      //   console.log(data);
      // })
  }

  async fetchKissCount() {
    try {
      const user = this.loggedInUser;
      const data = await this.supabaseService.getUsers(); // You can adjust this method to fetch kisses based on the user
      const currentUserData = data.find((d: any) => d.name === user);
      if (currentUserData) {
        this.kissCount = currentUserData.count_of_kisses;
      }
    } catch (error) {
      console.error('Error fetching kiss count:', error);
    }
  }

  async sendKiss() {
    try {
      const receiver = this.loggedInUser === 'diego' ? 'timi' : 'diego';
      const newKissCount = await this.supabaseService.sendKiss(receiver);
      // this.kissCount = newKissCount;
    } catch (error) {
      console.error('Error sending kiss:', error);
    }
  }
}
