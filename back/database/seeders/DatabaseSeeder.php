<?php

namespace Database\Seeders;

use App\Models\Feed;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use \Datetime;

class DatabaseSeeder extends Seeder {

    public function run()
    {
        $this->call(FeedTableSeeder::class);

        $this->command->info('Feed table seeded!');
    }

}

class FeedTableSeeder extends Seeder {

    public function run()
    {

        Feed::create(array(
            'author' => 'Gabriel',
            'categorie' => 'Post',
            'published_text' => 'Lorem',
            'avatar_url' => asset('images/avatar_default.png'),
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ));
    }

}
