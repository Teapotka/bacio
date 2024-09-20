import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'environment'; // Fixing the import path

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() { 
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async getUsers() {
    try {
      const { data, error } = await this.supabase
        .from('kisses')
        .select('*');
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async sendKiss(receiver: string) {
    try {
      const { data: receiverUser, error: receiverError } = await this.supabase
        .from('kisses')
        .select('id, count_of_kisses')
        .eq('name', receiver)
        .single();

      if (receiverError) throw receiverError;
      if (!receiverUser) throw new Error('Receiver not found');

      const updatedKisses = receiverUser.count_of_kisses + 1;

      const { error: updateError } = await this.supabase
        .from('kisses')
        .update({ count_of_kisses: updatedKisses })
        .eq('id', receiverUser.id);

      if (updateError) throw updateError;

      return updatedKisses;
    } catch (error) {
      console.error('Error sending kiss:', error);
      throw error;
    }
  }
}
