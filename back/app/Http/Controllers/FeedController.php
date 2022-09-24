<?php

namespace App\Http\Controllers;

use App\Interfaces\CRUDFeed;
use App\Models\Feed;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use \DateTime;

class FeedController extends BaseController implements CRUDFeed{

    public function read() {

        $feedRecords = Feed::latest()->paginate(7);
        
        foreach($feedRecords as $index => $feedRecord) {
            if($feedRecord["publish_image"] != null) {
                $feedRecords[$index]["publish_image"] = asset($feedRecord["publish_image"]);
            }
        }

        return Response()->json($feedRecords);
    }

    public function create(Request $request) {     

        $bodyRequest = $request->all();
        
        $path_publish_image = null;
        if($request->file('photo')) {
            $path_publish_image = $request->photo->store('images');
        }

        $createRecordFeed = Feed::create(array(
            'author' => $bodyRequest["author"],
            'categorie' => $bodyRequest["categorie"],
            'published_text' => $bodyRequest["text_at_published"],
            'avatar_url' => asset('images/avatar_default.png'),
            'publish_image' => $path_publish_image,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime()
        ));

        return Response()->json(array("return" => $createRecordFeed));
    }

    public function delete($paramsID) {

        $findPostId = Feed::find($paramsID);

        if($findPostId === null) {

            return Response()->json(array(
                "error" => true,
                "message" => "Not found ID"
            ), 404);
        }
        
        $findPostId->delete();
        Storage::delete($findPostId["publish_image"]);

        return Response()->json(array("return" => $findPostId));
    }

    public function update(Request $request, $paramsID) {
        

        $bodyRequest = $request->all();

        $publish_post_record = Feed::find($paramsID);

        if($publish_post_record === null) {

            return Response()->json(array(
                "error" => true,
                "message" => "Not found Post"
            ), 404);
        }

        $path_publish_image = $publish_post_record["publish_image"];

        if($request->file('photo')) {
            $path_publish_image = $request->photo->store('images');
        }

        $publish_post_record::where('id', $paramsID)->update([
            'categorie' => $bodyRequest["categorie"],
            'published_text' => $bodyRequest["text_at_published"],
            'publish_image' => $path_publish_image,
            'updated_at' => new DateTime()
        ]);

        return Response()->json(array("return" => $publish_post_record));
    }
}