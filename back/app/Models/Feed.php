<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

Class Feed extends Model {
    protected $fillable = [
        "author", 
        "categorie", 
        "published_text", 
        "avatar_url",
        "publish_image"
    ];
    protected $table = "feed";
}